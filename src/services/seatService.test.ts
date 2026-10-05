import { beforeEach, describe, expect, it, vi } from "vitest";

import { client } from "@/lib/client/client";
import { TicketSeat } from "@/types/seat";

import { extendHold, fetchTicketSeats, holdSeat, releaseSeat } from "./seatService";

vi.mock("@/lib/client/client", () => ({
  client: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

const mockedClient = vi.mocked(client);

describe("seatService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetchTicketSeats는 GET /ticketSeat/{ticketId}를 호출하고 response.data를 반환한다", async () => {
    // Arrange: API 응답 준비
    const ticketId = 1;
    const seats: TicketSeat[] = [
      {
        id: 10,
        seat: { id: 100, seatRow: "A", seatNumber: "1", venueId: 1 },
        status: "AVAILABLE",
        holdExpiresAt: null,
        grade: "VIP",
        price: 150000,
      },
    ];
    mockedClient.get.mockResolvedValue({ data: seats });

    // Act
    const result = await fetchTicketSeats(ticketId);

    // Assert
    expect(mockedClient.get).toHaveBeenCalledTimes(1);
    expect(mockedClient.get).toHaveBeenCalledWith(`/ticketSeat/${ticketId}`);
    expect(result).toEqual(seats);
  });

  it("holdSeat는 PATCH /ticketSeat/hold에 { holdUserId, ids }를 전달한다", async () => {
    // Arrange
    const ids = [1, 2];
    const holdUserId = "user-a";
    mockedClient.patch.mockResolvedValue({ data: undefined });

    // Act
    await holdSeat(ids, holdUserId);

    // Assert
    expect(mockedClient.patch).toHaveBeenCalledTimes(1);
    expect(mockedClient.patch).toHaveBeenCalledWith("/ticketSeat/hold", { holdUserId, ids });
  });

  it("releaseSeat는 PATCH /ticketSeat/cancel에 { holdUserId, ids }를 전달한다", async () => {
    // Arrange
    const ids = [1, 2];
    const holdUserId = "user-a";
    mockedClient.patch.mockResolvedValue({ data: undefined });

    // Act
    await releaseSeat(ids, holdUserId);

    // Assert
    expect(mockedClient.patch).toHaveBeenCalledTimes(1);
    expect(mockedClient.patch).toHaveBeenCalledWith("/ticketSeat/cancel", { holdUserId, ids });
  });

  it("extendHold는 PATCH /ticketSeat/extend에 { holdUserId, ids }를 전달한다", async () => {
    // Arrange
    const ids = [1, 2];
    const holdUserId = "user-a";
    mockedClient.patch.mockResolvedValue({ data: undefined });

    // Act
    await extendHold(ids, holdUserId);

    // Assert
    expect(mockedClient.patch).toHaveBeenCalledTimes(1);
    expect(mockedClient.patch).toHaveBeenCalledWith("/ticketSeat/extend", { holdUserId, ids });
  });
});
