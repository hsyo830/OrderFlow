import type { Ticket } from "@/types/ticket";

export const tickets: Ticket[] = [
  {
    id: 1,
    title: "HIU CONCERT THE WINNING",
    image: "/images/tickets/hiu-concert-cover.png",
    category: "concert",
    date: {
      start: "2026-10-01",
      end: "2026-10-07",
    },
    location: "KSPO DOME",
    price: 159000,
  },
  {
    id: 2,
    title: "BLACKPUNK WORLD TOUR",
    image: "/images/tickets/blackpunk-concert-cover.png",
    category: "concert",
    date: {
      start: "2026-11-14",
      end: "2026-11-15",
    },
    location: "고척스카이돔",
    price: 176000,
  },
  {
    id: 3,
    title: "GORTIS LIVE CONCERT",
    image: "/images/tickets/gortis-concert-cover.png",
    category: "concert",
    date: {
      start: "2027-01-22",
      end: "2027-01-24",
    },
    location: "인스파이어 아레나",
    price: 165000,
  },
  {
    id: 4,
    title: "KBO ALL-STAR FESTIVAL",
    image: "/images/tickets/kbo-allstar-festival-cover.png",
    category: "festival",
    date: {
      start: "2027-07-16",
      end: "2027-07-17",
    },
    location: "잠실야구장",
    price: 55000,
  },
  {
    id: 5,
    title: "마음의 쉼표, 행복을 찾는 시간",
    image: "/images/tickets/temple-lecture-cover.png",
    category: "lecture",
    date: {
      start: "2027-03-13",
      end: "2027-03-13",
    },
    location: "세종문화회관 대극장",
    price: 44000,
  },
  {
    id: 6,
    title: "WATERBOOM SUMMER FESTIVAL",
    image: "/images/tickets/waterboom-festival-cover.png",
    category: "festival",
    date: {
      start: "2027-07-30",
      end: "2027-08-01",
    },
    location: "서울랜드",
    price: 132000,
  },
  {
    id: 7,
    title: "뮤지컬 탐정: 사라진 진실",
    image: "/images/tickets/tamjung-musical-cover.png",
    category: "musical",
    date: {
      start: "2027-10-01",
      end: "2028-01-30",
    },
    location: "블루스퀘어 신한카드홀",
    price: 150000,
  },
  {
    id: 8,
    title: "김호민 바이올린 리사이틀",
    image: "/images/tickets/kimhomin-classical-cover.png",
    category: "classical",
    date: {
      start: "2028-04-15",
      end: "2028-04-15",
    },
    location: "예술의전당 콘서트홀",
    price: 110000,
  },
  {
    id: 9,
    title: "매직보이의 신비한 동화나라",
    image: "/images/tickets/magicboy-kids-cover.png",
    category: "kids",
    date: {
      start: "2028-07-22",
      end: "2028-09-03",
    },
    location: "유니버설아트센터",
    price: 66000,
  },
];
