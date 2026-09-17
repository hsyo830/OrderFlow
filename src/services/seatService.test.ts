import { describe, expect, it } from "vitest";

import { fetchTicketSeats, holdSeat, releaseSeat } from "./seatService";

describe("seatService", () => {
  it("AVAILABLE 좌석을 HOLD하면 상태가 HOLD로 변경된다", async () => {
    // Arrange: 테스트할 공연과 사용자 준비
    const ticketId = 1;
    const userId = "user-a";

    const seats = await fetchTicketSeats(ticketId);
    const seat = seats[0];

    // Act: 좌석 선점
    await holdSeat([seat.id], userId);

    // Assert: 다시 조회했을 때 HOLD인지 확인
    const updatedSeats = await fetchTicketSeats(ticketId);
    const updatedSeat = updatedSeats.find((item) => item.id === seat.id);

    expect(updatedSeat?.status).toBe("HOLD");
  });

  it("다른 사용자가 HOLD한 좌석은 HOLD할 수 없다", async () => {
    // Arrange: 테스트할 공연과 사용자 준비
    const ticketId = 2;
    const userId1 = "user-a";
    const userId2 = "user-b";

    const seats = await fetchTicketSeats(ticketId);
    const seat = seats[0];

    // Act: 이선좌 테스트 (user-a 좌석 선점 후 user-b 동일 좌석 예약 실패)
    await holdSeat([seat.id], userId1);

    await expect(holdSeat([seat.id], userId2)).rejects.toThrow();
  });

  it("사용자가 HOLD한 좌석을 취소한 경우 AVAILABLE이 된다", async () => {
    // Arrange: 테스트할 공연과 사용자 준비
    const ticketId = 3;
    const userId1 = "user-a";

    const seats = await fetchTicketSeats(ticketId);
    const seat = seats[0];

    // Act: A가 HOLD한 좌석을 A가 release하면 다시 AVAILABLE이 됨
    await holdSeat([seat.id], userId1);
    await releaseSeat([seat.id], userId1);

    // Assert: 다시 조회했을 때 AVAILABLE인지 확인
    const updatedSeats = await fetchTicketSeats(ticketId);
    const updatedSeat = updatedSeats.find((item) => item.id === seat.id);

    expect(updatedSeat?.status).toBe("AVAILABLE");
  });

  it("다른 사용자가 HOLD한 좌석을 release할 수 없다", async () => {
    // Arrange: 테스트할 공연과 사용자 준비
    const ticketId = 4;
    const userId1 = "user-a";
    const userId2 = "user-b";

    const seats = await fetchTicketSeats(ticketId);
    const seat = seats[0];

    // Act: A가 HOLD한 좌석을 B가 release 시도
    await holdSeat([seat.id], userId1);
    await expect(releaseSeat([seat.id], userId2)).rejects.toThrow();
  });

  it("존재하지 않는 ID가 하나라도 포함되면 전체 HOLD가 실패한다", async () => {
    // Arrange: 테스트할 공연과 사용자 준비
    const ticketId = 5;
    const userId1 = "user-a";

    const seats = await fetchTicketSeats(ticketId);
    const seat = seats[0];

    // Act: A가 HOLD한 좌석을 B가 release 시도
    await expect(holdSeat([seat.id, 100], userId1)).rejects.toThrow();

    const updatedSeats = await fetchTicketSeats(ticketId);
    const updatedSeat = updatedSeats.find((item) => item.id === seat.id);

    expect(updatedSeat?.status).toBe("AVAILABLE");
  });
});
