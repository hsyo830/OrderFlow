import Image from "next/image";

import Container from "@/components/layout/Container";

const TicketsTopBanner = () => {
  return (
    <div className="relative h-57 w-full md:h-67">
      <Image
        src="/images/banner/main-banner-01.png"
        alt="메인 배너 이미지"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20 md:bg-black/0" />

      <div className="absolute inset-0 flex w-full items-center justify-center md:pb-5">
        <Container>
          <div className="flex flex-col gap-2 md:gap-3.5 md:px-10">
            <div className="text-inverse text-3xl leading-snug font-bold md:text-4xl">
              티켓 목록
            </div>
            <div className="text-inverse w-55 text-sm font-light md:w-full md:text-base">
              다양한 콘서트, 강연, 페스티벌 티켓을 한눈에 확인하고 예매하세요.
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TicketsTopBanner;
