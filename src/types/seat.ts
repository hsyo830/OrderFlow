export type TicketSeatStatus = "AVAILABLE" | "HOLD" | "PAYMENT_PENDING" | "SOLD";

export type TicketSeat = {
  /** ticket_seats.id — 좌석 선택/HOLD/cancel 요청에 사용 */
  id: number;
  seat: {
    /** 공연장 물리 좌석 id (TicketSeat.id와 다름) */
    id: number;
    seatRow: string;
    seatNumber: string;
    venueId: number;
  };
  status: TicketSeatStatus;
  holdExpiresAt: string | null;
  grade: "VIP" | "R" | "S";
  price: number;
};
