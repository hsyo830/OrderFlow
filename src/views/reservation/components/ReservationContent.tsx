import { onlineManager, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { createReservation } from "@/services/reservationService";
import { fetchTicketSeats, holdSeat, releaseSeat } from "@/services/seatService";
import { useAuthStore } from "@/stores/authStore";
import { CurrentReservation } from "@/types/reservation";
import { TicketSeat } from "@/types/seat";
import { TicketDetail } from "@/types/ticket";
import { isSameSeatSet } from "@/views/reservation/utils/isSameSeatSet";

import ReservationConfirm from "./ReservationConfirm";
import ReservationPayment from "./ReservationPayment";
import ReservationSteps from "./ReservationSteps";
import SeatMap from "./SeatMap";
import SelectedSeatSummary from "./SelectedSeatSummary";
import TicketInfo from "./TicketInfo";

const MAX_SELECTABLE_SEATS = 4;

type ReservationStep = 1 | 2 | 3;

// 불변식: step >= 2이면 선택 좌석이 있고, step === 3이면 예약이 있다.
// 깨졌을 때 갈 수 있는 가장 앞선 유효 단계를 돌려준다.
const getValidStep = (
  step: ReservationStep,
  hasSelectedSeats: boolean,
  hasReservation: boolean,
): ReservationStep => {
  if (!hasSelectedSeats) return 1;
  if (step === 3 && !hasReservation) return 2;
  return step;
};

type ReservationContentProps = {
  data: TicketDetail;
};

const ReservationContent = ({ data }: ReservationContentProps) => {
  // step 전환 시 이 컴포넌트는 언마운트되지 않으므로 selectedSeatIds(와 서버의 HOLD)는 유지된다.
  const [step, setStep] = useState<ReservationStep>(1);
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
  const [pendingSeatIds, setPendingSeatIds] = useState<Set<number>>(new Set());
  // 생성된 예약(PAYMENT_PENDING). 새로고침하면 사라진다 (예약 조회 API 없음, 알려진 한계).
  const [reservation, setReservation] = useState<CurrentReservation | null>(null);
  // 예약 생성 요청의 결과를 알 수 없는 상태 (응답 없음/5xx). 서버에 예약이 생겼을 수도 있다.
  const [isReservationUncertain, setIsReservationUncertain] = useState(false);

  const queryClient = useQueryClient();
  const holdUserId = useAuthStore((state) => state.user?.id);

  const {
    data: ticketSeats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ticketSeats", data.id],
    queryFn: () => fetchTicketSeats(data.id),
  });

  const addPendingSeat = (seatId: number) => setPendingSeatIds((prev) => new Set(prev).add(seatId));

  const removePendingSeat = (seatId: number) =>
    setPendingSeatIds((prev) => {
      const next = new Set(prev);
      next.delete(seatId);
      return next;
    });

  const handleMutationError = (message: string) => {
    toast.error(message);
    queryClient.invalidateQueries({ queryKey: ["ticketSeats", data.id] });
  };

  const holdMutation = useMutation({
    mutationFn: (seat: TicketSeat) => holdSeat([seat.id], holdUserId!),
    onMutate: (seat) => addPendingSeat(seat.id),
    onSuccess: (_result, seat) => {
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    },
    onError: () =>
      handleMutationError("좌석 선점에 실패했습니다. 다른 사용자가 먼저 선택했을 수 있어요."),
    onSettled: (_result, _err, seat) => removePendingSeat(seat.id),
  });

  const releaseMutation = useMutation({
    mutationFn: (seat: TicketSeat) => releaseSeat([seat.id], holdUserId!),
    onMutate: (seat) => addPendingSeat(seat.id),
    onSuccess: (_result, seat) => {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    },
    onError: () => handleMutationError("좌석 해제에 실패했습니다. 다시 시도해주세요."),
    onSettled: (_result, _err, seat) => removePendingSeat(seat.id),
  });

  // 스크롤은 앞으로 갈 때만 맨 위로 올린다. 뒤로 갈 때는 위치를 유지한다.
  const goToStep = (nextStep: ReservationStep) => {
    setStep(nextStep);
    window.scrollTo({ top: 0 });
  };

  // retry는 기본값(0)을 그대로 쓴다. 생성 요청을 자동 재시도하면 중복 예약이 생길 수 있다.
  const createReservationMutation = useMutation({
    mutationFn: (ticketSeatIds: number[]) => createReservation({ ticketSeatIds }),
    onSuccess: (createdReservation, ticketSeatIds) => {
      // 재사용 판정을 위해 응답에 "요청에 보낸 좌석"을 함께 저장한다.
      setReservation({ ...createdReservation, ticketSeatIds });
      goToStep(3);
    },
    // 응답 유무로만 분류한다. 에러 메시지 문자열은 파싱하지 않는다.
    // TODO(백엔드 미확정): 4xx 에러 코드(HOLD 만료, 타인 선점, 중복 예약) 구분
    onError: (error) => {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;

      // 확정 실패: 서버가 4xx로 응답했으므로 예약은 생성되지 않았다.
      if (status !== undefined && status >= 400 && status < 500) {
        handleMutationError("예약을 생성하지 못했습니다. 좌석을 다시 확인해주세요.");
        setStep(1);
        return;
      }

      // 결과 불확실: 응답 없음(timeout, 네트워크) 또는 5xx. 서버에 예약이 생겼을 수 있으므로
      // 자동 재시도하지 않고 [결제하기]를 막는다.
      setIsReservationUncertain(true);
      toast.error("예약 결과를 확인하지 못했습니다. 새로고침 후 다시 시도해주세요.");
    },
  });

  // 서버에 내 예약이 있거나, 있을 수 있는 동안에는 좌석 선택/해제를 막는다.
  // - reservation: 예약 생성됨 (A안)
  // - isPending: 요청 중. 응답이 이전 좌석으로 예약을 만들 수 있다
  // - isReservationUncertain: 응답 없음/5xx. 서버에 예약이 생겼을 수 있다
  // 별도 state로 두지 않고 파생한다.
  const isSeatLocked =
    reservation !== null || createReservationMutation.isPending || isReservationUncertain;

  // pendingSeatIds는 HOLD/release 요청 모두를 담는 "중복 클릭 방지"용 집합이다.
  // release pending 좌석은 selectedSeatIds에 이미 포함돼 있으므로(비낙관적 해제,
  // 응답 전까지 selectedSeatIds에서 안 빠짐) 그대로 pendingSeatIds.size를 더하면
  // 같은 좌석이 두 번 카운트된다. 4석 제한에는 "아직 selectedSeatIds에 없는"
  // HOLD pending 좌석만 더해야 한다.
  const pendingHoldSeatCount = Array.from(pendingSeatIds).filter(
    (seatId) => !selectedSeatIds.includes(seatId),
  ).length;
  const isSelectionFull = selectedSeatIds.length + pendingHoldSeatCount >= MAX_SELECTABLE_SEATS;

  const handleSeatClick = (seat: TicketSeat) => {
    // 잠금 중에는 선택/해제 모두 막는다. 해제도 막으므로 release 요청이 나가지 않는다.
    if (isSeatLocked) return;
    if (pendingSeatIds.has(seat.id)) return;

    if (!holdUserId) {
      toast.error("로그인 후 좌석을 선택할 수 있습니다.");
      return;
    }

    const isSelected = selectedSeatIds.includes(seat.id);

    if (isSelected) {
      releaseMutation.mutate(seat);
      return;
    }

    if (isSelectionFull) {
      toast.error(`좌석은 최대 ${MAX_SELECTABLE_SEATS}석까지 선택할 수 있습니다.`);
      return;
    }

    holdMutation.mutate(seat);
  };

  const selectedSeats = ticketSeats?.filter((seat) => selectedSeatIds.includes(seat.id)) ?? [];
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // step 하나만 렌더링 기준으로 쓴다. 불변식이 깨지면 표시만 바꾸지 않고 step 자체를 보정한다.
  // useEffect로 보정하면 잘못된 화면이 한 번 커밋되므로, 렌더 중에 조건부로 setState한다.
  // (React는 이 렌더 결과를 버리고 커밋 전에 즉시 다시 렌더한다. 조건이 있어 무한 루프는 없다.)
  const validStep = getValidStep(step, selectedSeats.length > 0, reservation !== null);
  if (step !== validStep) {
    setStep(validStep);
  }

  const handlePaymentClick = () => {
    // 버튼 disabled와 이중으로 막는다 (연타, 결과 불확실 상태에서의 재요청 방지).
    if (createReservationMutation.isPending || isReservationUncertain) return;

    if (reservation) {
      // 같은 좌석이면 API를 다시 호출하지 않고 기존 예약(PAYMENT_PENDING)을 재사용한다.
      if (isSameSeatSet(reservation.ticketSeatIds, selectedSeatIds)) {
        goToStep(3);
        return;
      }

      // 좌석 잠금 때문에 정상 경로에서는 오지 않는 방어용 분기. 새 예약은 만들지 않는다.
      toast.error("이미 결제 진행 중인 예약이 있어 좌석을 변경할 수 없습니다.");
      return;
    }

    // 오프라인이면 React Query가 mutation을 일시정지(paused)시켜 "예약 생성 중..."에 무기한 머문다.
    // 여기서 막으면 요청이 나가지 않은 것이 확실하므로 불확실 상태로 만들지 않는다.
    // React Query가 일시정지 여부를 판단할 때 쓰는 것과 같은 onlineManager를 기준으로 한다.
    if (!onlineManager.isOnline()) {
      toast.error("네트워크 연결을 확인해주세요.");
      return;
    }

    createReservationMutation.mutate(selectedSeatIds);
  };

  return (
    <>
      <ReservationSteps currentStep={step} />
      {isReservationUncertain && (
        <p className="bg-danger-soft text-danger mb-4 rounded-lg px-4 py-3 text-sm">
          예약 결과를 확인하지 못했습니다. 중복 예약을 막기 위해 결제를 진행할 수 없습니다. 새로고침
          후 다시 시도해주세요.
        </p>
      )}
      {step === 2 && (
        <ReservationConfirm
          data={data}
          selectedSeats={selectedSeats}
          totalAmount={totalAmount}
          onPrev={() => setStep(1)}
          isDisabled={isReservationUncertain}
          isPending={createReservationMutation.isPending}
          onPaymentClick={handlePaymentClick}
        />
      )}
      {/* reservation 검사는 불변식과 같은 조건이지만, TS가 null을 좁히도록 여기서도 확인한다. */}
      {step === 3 && reservation && (
        <ReservationPayment
          data={data}
          selectedSeats={selectedSeats}
          totalAmount={totalAmount}
          reservation={reservation}
          onPrev={() => setStep(2)}
        />
      )}
      {step === 1 && (
        <div className="border-border rounded-xl border p-4 md:p-6">
          <TicketInfo data={data} />
          <div className="border-border my-5 border-t md:my-6" />
          {reservation !== null && (
            <p className="bg-warning-soft text-warning mb-4 rounded-lg px-4 py-3 text-sm">
              결제 진행 중인 예약이 있어 좌석을 변경할 수 없습니다.
            </p>
          )}
          {isReservationUncertain && (
            <p className="bg-warning-soft text-warning mb-4 rounded-lg px-4 py-3 text-sm">
              예약 결과를 확인 중이라 좌석을 변경할 수 없습니다. 새로고침 후 다시 시도해주세요.
            </p>
          )}
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="min-w-0 flex-1">
              {isLoading && (
                <div className="text-muted flex h-40 items-center justify-center text-sm">
                  좌석 정보를 불러오는 중...
                </div>
              )}
              {error && (
                <div className="text-muted flex h-40 items-center justify-center text-sm">
                  좌석 정보를 불러오지 못했습니다.
                </div>
              )}
              {ticketSeats && (
                <SeatMap
                  seats={ticketSeats}
                  selectedSeatIds={selectedSeatIds}
                  pendingSeatIds={pendingSeatIds}
                  isSelectionFull={isSelectionFull}
                  isLocked={isSeatLocked}
                  onSeatClick={handleSeatClick}
                />
              )}
            </div>
            <div className="w-full shrink-0 lg:w-72 xl:w-80">
              <SelectedSeatSummary
                selectedSeats={selectedSeats}
                totalAmount={totalAmount}
                maxSeats={MAX_SELECTABLE_SEATS}
                isPending={pendingSeatIds.size > 0}
                onNext={() => goToStep(2)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationContent;
