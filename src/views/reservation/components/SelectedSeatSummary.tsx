import Button from "@/components/common/Button";

type SelectedSeatSummaryProps = {
  selectedSeatIds: number[];
};

const SelectedSeatSummary = ({ selectedSeatIds }: SelectedSeatSummaryProps) => {
  return (
    <aside className="border-border flex h-full min-h-105 flex-col rounded-xl border p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">선택한 좌석</h2>
        <span className="text-brand text-xl font-bold">{selectedSeatIds.length}석</span>
      </div>

      <div className="bg-surface-2 mt-5 flex min-h-40 items-center justify-center rounded-lg px-4 text-center">
        <p className="text-muted text-sm leading-6">
          선택한 좌석이 없습니다.
          <br />
          좌석을 선택해주세요.
        </p>
      </div>

      <div className="mt-auto">
        <div className="border-border mb-5 border-t pt-5">
          <div className="flex items-center justify-between">
            <span className="font-bold">티켓 금액</span>
            <span className="text-brand text-xl font-bold">0원</span>
          </div>
        </div>
        <Button variant="primary" disabled className="w-full">
          다음으로
        </Button>
      </div>
    </aside>
  );
};

export default SelectedSeatSummary;
