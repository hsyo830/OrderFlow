import Image from "next/image";

import Button from "@/components/common/Button";

const MobileAppCard = () => {
  return (
    <div className="bg-brand-soft relative flex flex-1 items-center justify-center overflow-hidden rounded-lg px-3.5 py-6 md:px-5 md:py-7">
      <div className="absolute top-5.5 left-5 z-10 flex flex-col gap-2 md:top-7 xl:top-8">
        <div className="text-base font-semibold whitespace-nowrap">모바일 앱으로 더 편리하게</div>
        <div className="mb-1.5 text-sm whitespace-nowrap md:mb-3 md:text-xs lg:text-sm">
          언제 어디서나 간편하게
          <br />
          티켓을 예매하고 관리해보세요.
        </div>
        <Button variant="outline-primary" className="w-28 font-semibold md:py-2 md:text-sm">
          앱 다운로드
        </Button>
      </div>

      <div className="relative ml-auto h-30 w-30 shrink-0 xl:h-35 xl:w-35">
        <Image
          src="/images/illustrations/app-mobile.png"
          alt="모바일 앱 화면"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default MobileAppCard;
