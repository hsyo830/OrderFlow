import { TicketCategory } from "@/constants/Category";

export type Ticket = {
  id: number;
  title: string;
  image: string;
  category: TicketCategory;
  start_date: string;
  end_date: string;
  venue_id: number;
  description: string;
  duration: number;
  age_limit: string;
  organizer: string;
  delivery: string;
};

export type TicketGradePrice = {
  id: number;
  ticket_id: number;
  grade: "VIP" | "R" | "S";
  price: number;
};

export type Venue = {
  id: number;
  name: string;
  address: string;
};

export type TicketListData = Ticket & {
  venues: Pick<Venue, "name">;
  ticket_grade_price: Pick<TicketGradePrice, "price">[];
};

export type TicketDetail = Ticket & {
  venues: Pick<Venue, "name">;
  ticket_grade_price: TicketGradePrice[];
};
