import { ComponentType, SVGProps } from "react";

import ClassicalIcon from "@/components/icons/CategoryIcons/ClassicalIcon";
import ConcertIcon from "@/components/icons/CategoryIcons/ConcertIcon";
import EtcIcon from "@/components/icons/CategoryIcons/EtcIcon";
import FestivalIcon from "@/components/icons/CategoryIcons/FestivalIcon";
import KidsIcon from "@/components/icons/CategoryIcons/KidsIcon";
import LectureIcon from "@/components/icons/CategoryIcons/LectureIcon";
import MusicalIcon from "@/components/icons/CategoryIcons/MusicalIcon";

export interface Category {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const categories = [
  {
    id: "concert",
    title: "콘서트",
    icon: ConcertIcon,
  },
  {
    id: "lecture",
    title: "강연",
    icon: LectureIcon,
  },
  {
    id: "musical",
    title: "뮤지컬",
    icon: MusicalIcon,
  },
  {
    id: "festival",
    title: "페스티벌",
    icon: FestivalIcon,
  },
  {
    id: "classical",
    title: "클래식",
    icon: ClassicalIcon,
  },
  {
    id: "kids",
    title: "아동/가족",
    icon: KidsIcon,
  },
  {
    id: "etc",
    title: "기타",
    icon: EtcIcon,
  },
] as const;
