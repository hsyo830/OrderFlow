import Image from "next/image";

import Button from "@/components/common/Button";

const TicketAlertCard = () => {
  return (
    <div className="bg-brand-soft relative flex flex-1 items-center justify-center overflow-hidden rounded-lg px-3.5 py-6 md:px-5 md:py-7">
      <div className="absolute top-5.5 left-5 z-10 flex flex-col gap-2 md:top-7 xl:top-8">
        <div className="text-base font-semibold whitespace-nowrap">티켓 오픈 알림</div>
        <div className="mb-1.5 text-sm whitespace-nowrap md:mb-3 md:text-xs lg:text-sm">
          원하는 공연의 티켓 오픈 소식을
          <br />
          놓치지 않도록 알려드려요.
        </div>
        <Button variant="outline-primary" className="w-28 font-semibold md:py-2 md:text-sm">
          알림 설정
        </Button>
      </div>

      <div className="relative ml-auto h-30 w-30 shrink-0 xl:h-35 xl:w-35">
        <Image
          src="/images/illustrations/bell-notification.png"
          alt="알림 벨 이미지"
          fill
          sizes="(min-width: 1280px) 140px, 120px"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default TicketAlertCard;
