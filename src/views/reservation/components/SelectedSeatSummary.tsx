import Button from "@/components/common/Button";
import { TicketSeat } from "@/types/seat";

type SelectedSeatSummaryProps = {
  selectedSeats: TicketSeat[];
  totalAmount: number;
  maxSeats: number;
};

const ROW_LABELS = ["A", "B", "C", "D", "E"] as const;
const SEATS_PER_ROW = 10;

const getSeatLabel = (seatId: number) => {
  const row = ROW_LABELS[Math.floor((seatId - 1) / SEATS_PER_ROW)];
  const number = ((seatId - 1) % SEATS_PER_ROW) + 1;
  return `${row}${number}`;
};

const SelectedSeatSummary = ({
  selectedSeats,
  totalAmount,
  maxSeats,
}: SelectedSeatSummaryProps) => {
  const hasSelection = selectedSeats.length > 0;

  return (
    <aside className="border-border flex h-full min-h-105 flex-col rounded-xl border p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">선택한 좌석</h2>
        <span className="text-brand text-xl font-bold">
          {selectedSeats.length}/{maxSeats}석
        </span>
      </div>

      <div className="bg-surface-2 mt-5 flex min-h-40 flex-col justify-center gap-2 rounded-lg px-4 py-4">
        {hasSelection ? (
          selectedSeats.map((seat) => (
            <div key={seat.id} className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {getSeatLabel(seat.seatId)} · {seat.grade}석
              </span>
              <span className="text-muted">{seat.price.toLocaleString()}원</span>
            </div>
          ))
        ) : (
          <p className="text-muted text-center text-sm leading-6">
            선택한 좌석이 없습니다.
            <br />
            좌석을 선택해주세요.
          </p>
        )}
      </div>

      <div className="mt-auto">
        <div className="border-border mb-5 border-t pt-5">
          <div className="flex items-center justify-between">
            <span className="font-bold">티켓 금액</span>
            <span className="text-brand text-xl font-bold">{totalAmount.toLocaleString()}원</span>
          </div>
        </div>
        <Button variant="primary" disabled={!hasSelection} className="w-full">
          다음으로
        </Button>
      </div>
    </aside>
  );
};

export default SelectedSeatSummary;
