import Image from "next/image";

import Button from "@/components/common/Button";

const QueueServiceCard = () => {
  return (
    <div className="bg-brand-dark relative flex flex-1 items-center justify-center overflow-hidden rounded-lg px-3.5 py-6 md:px-5 md:py-7">
      <div className="absolute top-5.5 left-5 z-10 flex flex-col gap-2 md:top-7 xl:top-8">
        <div className="text-inverse text-base font-medium whitespace-nowrap">
          실시간 대기열 서비스
        </div>
        <div className="text-inverse mb-1.5 text-sm font-light whitespace-nowrap md:mb-3 md:text-xs lg:text-sm">
          내 앞의 대기 인원을 실시간으로 확인하고
          <br />
          예상 대기 시간을 확인해보세요.
        </div>
        <Button variant="outline-primary" className="w-28 font-semibold md:py-2 md:text-sm">
          자세히 보기
        </Button>
      </div>

      <div className="relative ml-auto h-30 w-30 shrink-0 xl:h-35 xl:w-35">
        <Image
          src="/images/illustrations/time-queue.png"
          alt="실시간 대기열 일러스트"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default QueueServiceCard;
