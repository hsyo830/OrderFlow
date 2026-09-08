const TicketNotice = () => {
  return (
    <div className="border-border flex w-full flex-col gap-3 rounded-lg border p-6">
      <h3 className="text-lg font-bold">유의사항</h3>

      <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
        <li>· 본 공연은 지정좌석제로 운영됩니다.</li>
        <li>· 티켓 예매 후 예매 취소/환불 규정을 반드시 확인해주세요.</li>
        <li>· 공연 당일 혼잡이 예상되오니 대중교통 이용을 권장합니다.</li>
        <li>· 공식 예매처가 아닌 경로로 구매한 티켓은 취소 및 환불이 불가합니다.</li>
      </ul>
    </div>
  );
};

export default TicketNotice;
