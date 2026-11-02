import Button from "@/components/common/Button";
import CalendarIcon from "@/components/icons/CalendarIcon";

const ReservationList = () => {
  return (
    <section>
      <h2 className="mb-6 text-xl font-bold">내 예매 내역</h2>

      <div className="border-border bg-surface flex flex-col items-center justify-center rounded-xl border px-5 py-14 text-center md:py-20">
        <div className="bg-brand-soft mb-4 flex size-14 items-center justify-center rounded-full md:mb-5 md:size-16">
          <CalendarIcon className="text-brand size-6 md:size-7" />
        </div>

        <p className="text-foreground text-base font-semibold md:text-lg">예약 내역이 없습니다.</p>
        <p className="text-muted mt-2 text-sm">관심 있는 공연을 찾아 예매해보세요.</p>

        <Button href="/tickets" className="mt-6 w-full max-w-50 md:mt-8">
          공연 둘러보기
        </Button>
      </div>
    </section>
  );
};

export default ReservationList;
