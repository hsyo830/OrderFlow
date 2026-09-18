import { TicketSeat, TicketSeatStatus } from "@/types/seat";

const HOLD_DURATION_MS = 5 * 60 * 1000;
const SEAT_COUNT_PER_TICKET = 50;

// ---- mock 전용 구간 (실제 API 연동 시 이 블록 전체를 걷어내고 fetch 호출로 교체) ----
// holdUserId, ticketId는 GET 응답 DTO(TicketSeat)에 포함된다고 확인되지 않았으므로
// mock 내부 상태 관리용으로만 들고, 외부로 반환하는 값에는 절대 노출하지 않는다.
type MockTicketSeatRecord = TicketSeat & {
  ticketId: number;
  holdUserId: string | null;
};

const mockStore: MockTicketSeatRecord[] = [];

const GRADE_BY_INDEX = (index: number): TicketSeat["grade"] => {
  if (index < 10) return "VIP";
  if (index < 30) return "S";
  return "R";
};

const PRICE_BY_GRADE: Record<TicketSeat["grade"], number> = {
  VIP: 150000,
  S: 110000,
  R: 80000,
};

const seedMockSeatsForTicket = (ticketId: number) => {
  const alreadySeeded = mockStore.some((seat) => seat.ticketId === ticketId);
  if (alreadySeeded) return;

  for (let index = 0; index < SEAT_COUNT_PER_TICKET; index += 1) {
    const grade = GRADE_BY_INDEX(index);
    mockStore.push({
      id: ticketId * 100 + index + 1,
      ticketId,
      seatId: index + 1,
      status: "AVAILABLE",
      holdExpiresAt: null,
      holdUserId: null,
      grade,
      price: PRICE_BY_GRADE[grade],
    });
  }
};

const isExpired = (record: MockTicketSeatRecord, now: number) =>
  record.status === "HOLD" &&
  !!record.holdExpiresAt &&
  new Date(record.holdExpiresAt).getTime() < now;

// 백엔드 명세: HOLD 만료는 스케줄러가 아니라 조회/취소 요청 시점에 검사해 AVAILABLE로 되돌린다.
const sweepExpiredHolds = (ticketId: number) => {
  const now = Date.now();
  mockStore.forEach((record) => {
    if (record.ticketId === ticketId && isExpired(record, now)) {
      record.status = "AVAILABLE";
      record.holdExpiresAt = null;
      record.holdUserId = null;
    }
  });
};

const toPublicSeat = ({
  id,
  seatId,
  status,
  holdExpiresAt,
  grade,
  price,
}: MockTicketSeatRecord): TicketSeat => ({
  id,
  seatId,
  status,
  holdExpiresAt,
  grade,
  price,
});

// hold/cancel/extend 요청의 ids가 ticket_seats.id(TicketSeat.id)를 가리키는지 seats.id(seatId)를
// 가리키는지는 API 계약에서 아직 확인되지 않았다. 계약 확인 전까지 TicketSeat.id 기준으로 동작한다.
// 요청한 ids 중 하나라도 존재하지 않으면 즉시 에러를 던져, 나머지 id에 대한 부분 처리가
// 발생하지 않도록 한다(뮤테이션 이전에 전량 검증).
const getExistingRecordsOrThrow = (ids: number[]): MockTicketSeatRecord[] => {
  const targets = mockStore.filter((record) => ids.includes(record.id));
  const missingIds = ids.filter((id) => !targets.some((record) => record.id === id));

  if (missingIds.length > 0) {
    throw new Error(`존재하지 않는 좌석입니다: ${missingIds.join(", ")}`);
  }

  return targets;
};
// ---- mock 전용 구간 끝 ----

export const fetchTicketSeats = async (ticketId: number): Promise<TicketSeat[]> => {
  seedMockSeatsForTicket(ticketId);
  sweepExpiredHolds(ticketId);

  return mockStore.filter((record) => record.ticketId === ticketId).map(toPublicSeat);
};

export const holdSeat = async (ids: number[], holdUserId: string): Promise<void> => {
  const targets = getExistingRecordsOrThrow(ids);

  targets.forEach((record) => {
    if (record.status !== "AVAILABLE") {
      throw new Error(`이미 선점된 좌석입니다: ${record.id}`);
    }
  });

  const holdExpiresAt = new Date(Date.now() + HOLD_DURATION_MS).toISOString();
  targets.forEach((record) => {
    record.status = "HOLD" as TicketSeatStatus;
    record.holdExpiresAt = holdExpiresAt;
    record.holdUserId = holdUserId;
  });
};

export const releaseSeat = async (ids: number[], holdUserId: string): Promise<void> => {
  // targets는 mockStore와 동일한 레퍼런스를 담고 있어 sweepExpiredHolds의 변경이 그대로 반영된다.
  const targets = getExistingRecordsOrThrow(ids);

  const ticketIds = new Set(targets.map((record) => record.ticketId));
  ticketIds.forEach((ticketId) => sweepExpiredHolds(ticketId));

  targets.forEach((record) => {
    if (record.status === "SOLD" || record.status === "PAYMENT_PENDING") {
      throw new Error(`취소할 수 없는 좌석입니다: ${record.id}`);
    }
    if (record.status === "HOLD" && record.holdUserId !== holdUserId) {
      throw new Error(`본인이 선점한 좌석이 아닙니다: ${record.id}`);
    }
    // status === "AVAILABLE": sweep으로 이미 만료 처리된 경우를 포함해 이미 목표 상태이므로 통과(no-op)
  });

  targets.forEach((record) => {
    if (record.status === "HOLD") {
      record.status = "AVAILABLE";
      record.holdExpiresAt = null;
      record.holdUserId = null;
    }
  });
};

export const extendHold = async (ids: number[], holdUserId: string): Promise<void> => {
  const targets = getExistingRecordsOrThrow(ids);

  targets.forEach((record) => {
    if (record.status !== "HOLD" || record.holdUserId !== holdUserId) {
      throw new Error(`연장할 수 없는 좌석입니다: ${record.id}`);
    }
  });

  const holdExpiresAt = new Date(Date.now() + HOLD_DURATION_MS).toISOString();
  targets.forEach((record) => {
    record.holdExpiresAt = holdExpiresAt;
  });
};
