"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import Badge from "@/components/common/Badge";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationPinIcon from "@/components/icons/LocationPinIcon";
import Container from "@/components/layout/Container";
import { categories } from "@/constants/Category";
import { tickets } from "@/constants/mocks/tickets";

const TicketDetailTopBanner = () => {
  const params = useParams();
  const ticketData = tickets.find((ticket) => ticket.id === Number(params?.id));

  if (!ticketData) {
    return null;
  }

  const category = categories.find((category) => category.id === ticketData.category);
  const ticketCategory = category?.title ?? "";

  return (
    <div className="bg-dark w-full">
      {/* 모바일 전용: 풀블리드 이미지 + 하단 텍스트 오버레이 */}
      <div className="relative h-110 w-full md:hidden">
        <Image
          src={ticketData.image}
          alt={ticketData.title}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          priority
          className="object-cover"
        />
        <div className="from-dark/90 absolute inset-x-0 bottom-0 z-10 flex h-[70%] flex-col justify-end gap-1 bg-linear-to-t from-60% to-transparent to-90% p-7">
          <div className="text-inverse flex flex-col items-start justify-center gap-3">
            <div className="text-4xl font-semibold">{ticketData.title}</div>
            <Badge variant="darkOpacity" text={ticketCategory} />
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-4.5" />
              <div>
                {ticketData.date.start} ~ {ticketData.date.end}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LocationPinIcon className="w-5.5" />
              <div>{ticketData.location}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 태블릿/PC 전용: 박스 이미지 + 옆에 텍스트 */}
      <div className="hidden justify-center py-13 md:flex">
        <Container>
          <div className="flex items-center gap-10">
            <div className="border-border-dark relative h-75 w-150 overflow-hidden rounded-lg border xl:h-90 xl:w-180">
              <Image
                src={ticketData.image}
                alt={ticketData.title}
                fill
                sizes="(min-width: 768px) 50vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="text-inverse flex flex-col items-start justify-center gap-3">
              <div className="text-4xl font-semibold">{ticketData.title}</div>
              <Badge variant="darkOpacity" text={ticketCategory} />
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-4.5" />
                <div>
                  {ticketData.date.start} ~ {ticketData.date.end}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LocationPinIcon className="w-5.5" />
                <div>{ticketData.location}</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TicketDetailTopBanner;
