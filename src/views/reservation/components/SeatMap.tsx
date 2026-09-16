import { TicketSeat } from "@/types/seat";

type SeatMapProps = {
  seats: TicketSeat[];
};

const ROW_LABELS = ["A", "B", "C", "D", "E"] as const;
const SEATS_PER_ROW = 10;

// TicketSeat 응답 DTO에는 seatRow/seatNumber가 없음(API에 포함되는지 미확인).
// seatService의 mock 시딩 순서(seatId 1~50을 10개씩 끊어 A~E행에 배정)에 기반한 임시
// 매핑이며, 실제 좌석 배치 데이터/응답 계약이 확정되면 반드시 교체해야 한다.
const getRowLabel = (seatId: number) => ROW_LABELS[Math.floor((seatId - 1) / SEATS_PER_ROW)];
const getSeatNumber = (seatId: number) => ((seatId - 1) % SEATS_PER_ROW) + 1;

const getSeatStyle = (grade: "VIP" | "R" | "S") => {
  switch (grade) {
    case "VIP":
      return "bg-seat-vip-soft hover:bg-seat-vip-hover/20";
    case "R":
      return "bg-seat-r-soft hover:bg-seat-r-hover/20";
    case "S":
      return "bg-seat-s-soft hover:bg-seat-s-hover/20";
  }
};

const SeatMap = ({ seats }: SeatMapProps) => {
  const handleSeatClick = (seat: TicketSeat) => {
    // TODO: 다음 단계에서 선택 상태 관리/HOLD 요청 로직으로 교체
    console.log("seat clicked", seat);
  };

  return (
    <div className="bg-surface-2 overflow-hidden rounded-xl">
      <div className="overflow-x-auto p-4 md:p-6">
        <div className="min-w-170">
          <div className="mx-auto mb-8 w-[70%]">
            <div className="bg-dark-button text-inverse flex h-12 items-center justify-center rounded-lg text-sm font-semibold tracking-[0.3em]">
              STAGE
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {ROW_LABELS.map((row) => (
              <div key={row} className="flex items-center justify-center gap-2.5">
                <span className="text-muted w-6 shrink-0 text-center text-sm font-semibold">
                  {row}
                </span>

                {seats
                  .filter((seat) => getRowLabel(seat.seatId) === row)
                  .sort((a, b) => getSeatNumber(a.seatId) - getSeatNumber(b.seatId))
                  .map((seat) => {
                    const isAvailable = seat.status === "AVAILABLE";
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => handleSeatClick(seat)}
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-colors ${
                          isAvailable
                            ? `cursor-pointer ${getSeatStyle(seat.grade)}`
                            : "bg-seat-sold text-muted cursor-not-allowed"
                        }`}
                      >
                        {getSeatNumber(seat.seatId)}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-seat-vip-soft h-5 w-5 rounded" />
              <span className="text-muted text-xs md:text-sm">VIP석 A열</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-seat-s-soft h-5 w-5 rounded" />
              <span className="text-muted text-xs md:text-sm">S석 B-C열</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-seat-r-soft h-5 w-5 rounded" />
              <span className="text-muted text-xs md:text-sm">R석 D-E열</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="border-border-strong bg-surface h-5 w-5 rounded border" />
              <span className="text-muted text-xs md:text-sm">선택 가능</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-brand h-5 w-5 rounded" />
              <span className="text-muted text-xs md:text-sm">선택한 좌석</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-seat-sold h-5 w-5 rounded" />
              <span className="text-muted text-xs md:text-sm">예매 완료</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
