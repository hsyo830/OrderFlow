import { TicketSeat } from "@/types/seat";

type SeatMapProps = {
  seats: TicketSeat[];
  selectedSeatIds: number[];
  pendingSeatIds: Set<number>;
  isSelectionFull: boolean;
  onSeatClick: (seat: TicketSeat) => void;
};

const getSeatStyle = (grade: "VIP" | "R" | "S", isSelected: boolean) => {
  if (isSelected) {
    switch (grade) {
      case "VIP":
        return "bg-seat-vip-selected border-seat-vip-selected-border text-inverse";
      case "R":
        return "bg-seat-r-selected border-seat-r-selected-border text-inverse";
      case "S":
        return "bg-seat-s-selected border-seat-s-selected-border text-inverse";
    }
  }
  switch (grade) {
    case "VIP":
      return "bg-seat-vip-soft hover:bg-seat-vip-hover/20";
    case "R":
      return "bg-seat-r-soft hover:bg-seat-r-hover/20";
    case "S":
      return "bg-seat-s-soft hover:bg-seat-s-hover/20";
  }
};

const SeatMap = ({
  seats,
  selectedSeatIds,
  pendingSeatIds,
  isSelectionFull,
  onSeatClick,
}: SeatMapProps) => {
  const seatRows = [...new Set(seats.map((seat) => seat.seat.seatRow))].sort((a, b) =>
    a.localeCompare(b),
  );

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
            {seatRows.map((row) => (
              <div key={row} className="flex items-center justify-center gap-2.5">
                <span className="text-muted w-6 shrink-0 text-center text-sm font-semibold">
                  {row}
                </span>

                {seats
                  .filter((seat) => seat.seat.seatRow === row)
                  .sort((a, b) => Number(a.seat.seatNumber) - Number(b.seat.seatNumber))
                  .map((seat) => {
                    const isAvailable = seat.status === "AVAILABLE";
                    const isSelected = selectedSeatIds.includes(seat.id);
                    const isPending = pendingSeatIds.has(seat.id);
                    const isSoldOut = !isAvailable && !isSelected;
                    const isBlockedByLimit = !isSelected && !isSoldOut && isSelectionFull;
                    const isDisabled = isSoldOut || isPending || isBlockedByLimit;

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => onSeatClick(seat)}
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-colors ${
                          isSoldOut
                            ? "bg-seat-sold text-muted cursor-not-allowed"
                            : `${getSeatStyle(seat.grade, isSelected)} ${
                                isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                              }`
                        }`}
                      >
                        {seat.seat.seatNumber}
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
