import Image from "next/image";

import Button from "@/components/common/Button";
import Container from "@/components/layout/Container";

const MainBanner = () => {
  return (
    <div className="relative h-95 w-full md:h-105">
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
            <div className="text-muted text-sm md:text-base">LIVE MOMENT, FOREVER</div>
            <div className="text-inverse text-3xl leading-snug font-bold md:text-4xl">
              특별한 순간을
              <br />
              <span className="text-brand">가장 빠르게 </span>예매하세요
            </div>
            <div className="text-inverse text-sm md:text-base">
              콘서트, 스포츠, 전시, 페스티벌까지
              <br />
              모든 티켓을 한 곳에서
            </div>
            <Button variant="primary" className="mt-5 w-50 py-3 md:w-87 md:text-sm">
              지금 인기 티켓 보기
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainBanner;
