export type TicketSeatStatus = "AVAILABLE" | "HOLD" | "PAYMENT_PENDING" | "SOLD";

// GET /api/ticketSeat/{ticketId} 응답 DTO 기준으로 확정된 필드만 반영.
// seatRow/seatNumber는 응답 포함 여부가 확인되지 않아 제외 — SeatMap 그리드와의
// 매핑 방식은 아직 미확정 사항.
export type TicketSeat = {
  id: number;
  seatId: number;
  status: TicketSeatStatus;
  holdExpiresAt: string | null;
  grade: "VIP" | "R" | "S";
  price: number;
};
