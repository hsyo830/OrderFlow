import Image from "next/image";
import { ReactNode } from "react";

import Button from "@/components/common/Button";
import { TicketSeat } from "@/types/seat";
import { TicketDetail } from "@/types/ticket";

type ReservationPaymentProps = {
  data: TicketDetail;
  selectedSeats: TicketSeat[];
  totalAmount: number;
  onPrev: () => void;
};

type PaymentInfoRowProps = {
  label: string;
  children: ReactNode;
};

// 앞의 2개는 모바일에서도 보이고, 나머지는 PC(lg)에서만 보인다.
const PAYMENT_NOTICES = [
  "'결제하기' 버튼을 클릭하면 토스페이먼츠 결제창이 실행됩니다.",
  "결제 완료 후 예매가 확정되며, 예매 완료 페이지로 이동합니다.",
  "결제 진행 중 창을 닫지 말아주세요.",
  "일부 환경에서는 결제창이 새 창으로 실행될 수 있습니다.",
];
const MOBILE_VISIBLE_NOTICE_COUNT = 2;

const PaymentInfoRow = ({ label, children }: PaymentInfoRowProps) => (
  <div className="border-border flex items-start justify-between gap-4 border-b py-3 md:py-4">
    <dt className="text-muted shrink-0 text-sm md:text-base">{label}</dt>
    <dd className="min-w-0 text-right text-sm font-medium md:text-base">{children}</dd>
  </div>
);

const ReservationPayment = ({
  data,
  selectedSeats,
  totalAmount,
  onPrev,
}: ReservationPaymentProps) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold md:text-3xl">결제하기</h1>
      <p className="text-muted mt-2 text-sm md:text-base">
        결제 수단을 선택하고 결제를 진행해주세요.
      </p>

      <div className="mt-6 flex flex-col gap-6 lg:grid lg:grid-cols-2">
        {/* 모바일 시안에는 카드 외곽선이 없어 lg에서만 카드로 감싼다. */}
        <div className="lg:border-border lg:bg-surface flex flex-col gap-4 lg:rounded-xl lg:border lg:p-6">
          <fieldset>
            <legend className="text-lg font-bold md:text-xl">결제 수단</legend>
            {/* 결제 수단이 토스페이먼츠 하나뿐이라 선택 상태로 고정한다. */}
            <label className="border-brand bg-brand-soft mt-4 flex cursor-pointer items-center gap-4 rounded-xl border p-4 md:gap-6 md:p-6">
              <input
                type="radio"
                name="paymentMethod"
                value="tosspay"
                checked
                readOnly
                className="accent-brand size-5 shrink-0"
              />
              {/* 원본 7500x2500(3:1). 이미지 자체에 투명 여백이 커서 높이를 넉넉히 잡는다. */}
              <Image
                src="/images/toss/TossPayments_Logo_Simple.png"
                alt="토스페이먼츠"
                width={7500}
                height={2500}
                className="h-12 w-auto shrink-0 md:h-16"
              />
              <span className="flex min-w-0 flex-col">
                <span className="text-sm font-bold md:text-base">토스페이먼츠</span>
                <span className="text-muted text-xs md:text-sm">간편하고 안전한 결제</span>
              </span>
            </label>
          </fieldset>

          <section className="bg-surface-2 rounded-xl p-4 md:p-6">
            <h2 className="text-sm font-bold md:text-base">결제 안내</h2>
            <ul className="text-muted mt-3 flex list-disc flex-col gap-1.5 pl-5 text-xs md:text-sm">
              {PAYMENT_NOTICES.map((notice, index) => (
                <li
                  key={notice}
                  className={index >= MOBILE_VISIBLE_NOTICE_COUNT ? "hidden lg:list-item" : ""}
                >
                  {notice}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="border-border bg-surface flex flex-col rounded-xl border p-4 md:p-6">
          <h2 className="text-lg font-bold md:text-xl">결제 내역</h2>
          <dl className="border-border mt-3 border-t">
            <PaymentInfoRow label="공연명">{data.title}</PaymentInfoRow>
            <PaymentInfoRow label="일시">
              {data.start_date} ~ {data.end_date}
            </PaymentInfoRow>
            <PaymentInfoRow label="장소">{data.venues.name}</PaymentInfoRow>
            <PaymentInfoRow label="좌석">
              <ul className="flex flex-col gap-1">
                {selectedSeats.map((seat) => (
                  <li key={seat.id}>
                    {`${seat.seat.seatRow}${seat.seat.seatNumber}`} · {seat.grade}석
                    <span className="text-muted ml-2">{seat.price.toLocaleString()}원</span>
                  </li>
                ))}
              </ul>
            </PaymentInfoRow>
            <PaymentInfoRow label="티켓 금액">
              <span className="text-muted">{totalAmount.toLocaleString()}원</span>
            </PaymentInfoRow>
          </dl>
          <div className="bg-brand-soft mt-4 flex items-center justify-between gap-4 rounded-xl p-4 md:p-6">
            <span className="text-sm font-bold md:text-base">최종 결제 금액</span>
            <span className="text-brand text-xl font-bold md:text-2xl">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
        </section>
      </div>

      {/* DOM 순서는 [이전][결제]. 모바일은 col-reverse로 결제 버튼이 위로 온다. */}
      <div className="mt-6 flex flex-col-reverse gap-3 lg:mx-auto lg:max-w-3xl lg:flex-row">
        <Button variant="outline-neutral" onClick={onPrev} className="py-4 lg:flex-1">
          이전
        </Button>
        {/* TODO: 결제 흐름 연결 (예약 생성 API 호출 시점은 백엔드와 협의 중) */}
        <Button variant="primary" disabled className="py-4 lg:flex-2">
          <span className="inline-flex items-center justify-center gap-1.5">
            {/* 원본 640x640(1:1). 투명 여백이 있어 글자보다 살짝 크게 둔다. */}
            <Image
              src="/images/toss/logo-toss-symbol-alpha.png"
              alt=""
              width={640}
              height={640}
              className="size-5 shrink-0 md:size-6"
            />
            <span>토스페이먼츠로 {totalAmount.toLocaleString()}원 결제하기 (준비 중)</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ReservationPayment;
