import { ReactNode } from "react";

import Button from "@/components/common/Button";
import { TicketSeat } from "@/types/seat";
import { TicketDetail } from "@/types/ticket";

type ReservationConfirmProps = {
  data: TicketDetail;
  selectedSeats: TicketSeat[];
  totalAmount: number;
  onPrev: () => void;
};

type InfoRowProps = {
  label: string;
  children: ReactNode;
};

const InfoRow = ({ label, children }: InfoRowProps) => (
  <div className="border-border flex items-start justify-between gap-4 border-b py-4 last:border-b-0">
    <dt className="text-muted shrink-0 text-sm md:text-base">{label}</dt>
    <dd className="min-w-0 text-right text-sm font-medium md:text-base">{children}</dd>
  </div>
);

const ReservationConfirm = ({
  data,
  selectedSeats,
  totalAmount,
  onPrev,
}: ReservationConfirmProps) => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-2xl font-bold md:text-3xl">예매 정보 확인</h1>
      <p className="text-muted mt-2 text-sm md:text-base">
        아래 내용을 확인하고 결제를 진행해주세요.
      </p>

      <dl className="border-border bg-surface mt-6 rounded-xl border px-5 py-2 md:px-8">
        <InfoRow label="공연명">{data.title}</InfoRow>
        <InfoRow label="일시">
          {data.start_date} ~ {data.end_date}
        </InfoRow>
        <InfoRow label="장소">{data.venues.name}</InfoRow>
        <InfoRow label="좌석">
          <ul className="flex flex-col gap-1">
            {selectedSeats.map((seat) => (
              <li key={seat.id}>
                {`${seat.seat.seatRow}${seat.seat.seatNumber}`} · {seat.grade}석
                <span className="text-muted ml-2">{seat.price.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        </InfoRow>
        <InfoRow label="티켓 금액">
          <span className="text-brand text-xl font-bold md:text-2xl">
            {totalAmount.toLocaleString()}원
          </span>
        </InfoRow>
      </dl>

      <div className="mt-6 flex gap-3">
        <Button variant="outline-neutral" onClick={onPrev} className="flex-1">
          이전
        </Button>
        {/* TODO: 결제 흐름 연결 (예약 생성 API 호출 시점은 백엔드와 협의 중) */}
        <Button variant="primary" disabled className="flex-2">
          결제하기 (준비 중)
        </Button>
      </div>
    </div>
  );
};

export default ReservationConfirm;
