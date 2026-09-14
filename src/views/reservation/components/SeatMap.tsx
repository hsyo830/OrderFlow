const SEAT_ROWS = [
  { row: "A", grade: "VIP" },
  { row: "B", grade: "S" },
  { row: "C", grade: "S" },
  { row: "D", grade: "R" },
  { row: "E", grade: "R" },
] as const;

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

const SeatMap = () => {
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
            {SEAT_ROWS.map(({ row, grade }) => (
              <div key={row} className="flex items-center justify-center gap-2.5">
                <span className="text-muted w-6 shrink-0 text-center text-sm font-semibold">
                  {row}
                </span>

                {Array.from({ length: 10 }, (_, index) => {
                  const seatNumber = index + 1;
                  return (
                    <button
                      key={`${row}-${seatNumber}`}
                      type="button"
                      className={`flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-colors ${getSeatStyle(
                        grade,
                      )}`}
                    >
                      {seatNumber}
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
