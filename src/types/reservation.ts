export type CreateReservationRequest = {
  /** ticket_seats.id 배열 (TicketSeat.id). 사용자는 JWT로 식별하므로 userId는 보내지 않는다 */
  ticketSeatIds: number[];
};

// TODO(백엔드 미확정): amount가 좌석 가격 합계와 항상 일치하는지 (할인 등)
export type CreateReservationResponse = {
  reservationId: number;
  orderId: string;
  amount: number;
};

/** 생성된 예약 + 요청에 보낸 좌석 id. 같은 좌석 재사용 판정에 쓴다 */
export type CurrentReservation = CreateReservationResponse & {
  ticketSeatIds: number[];
};
