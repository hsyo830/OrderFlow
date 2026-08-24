const TicketInformation = () => {
  return (
    <div className="border-border flex flex-col gap-3 rounded-lg border p-6">
      <h3 className="text-lg font-bold">공연 정보</h3>
      <ul className="text-muted-foreground flex flex-col gap-3 text-sm">
        <li className="flex items-center justify-between">
          <div className="font-medium">관람 시간</div>
          <div>120분</div>
        </li>
        <li className="flex items-center justify-between">
          <div className="font-medium">관람 연령</div>
          <div>만 7세 이상</div>
        </li>
        <li className="flex items-center justify-between">
          <div className="font-medium">주최/주관</div>
          <div>EDM엔터테인먼트</div>
        </li>
        <li className="flex items-center justify-between">
          <div className="font-medium">배송</div>
          <div>2026.09.20부터 순차 배송</div>
        </li>
      </ul>
    </div>
  );
};

export default TicketInformation;
