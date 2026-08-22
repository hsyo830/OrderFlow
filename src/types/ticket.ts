import { TicketCategory } from "@/constants/Category";

export type Ticket = {
  id: number;
  title: string;
  image: string;
  category: TicketCategory;
  date: {
    start: string;
    end: string;
  };
  location: string;
  price: number;
};

export type TicketDetail = Ticket & {
  description: string;

  performanceInfo: {
    duration: number;
    ageLimit: string;
    organizer: string;
    delivery: string;
  };

  notices: string[];
};
