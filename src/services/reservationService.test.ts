import { beforeEach, describe, expect, it, vi } from "vitest";

import { client } from "@/lib/client/client";
import { CreateReservationResponse } from "@/types/reservation";

import { createReservation } from "./reservationService";

vi.mock("@/lib/client/client", () => ({
  client: {
    post: vi.fn(),
  },
}));

const mockedClient = vi.mocked(client);

describe("reservationService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("createReservation은 POST /reservation에 { ticketSeatIds }를 전달하고 response.data를 반환한다", async () => {
    // Arrange
    const ticketSeatIds = [10, 11];
    const reservation: CreateReservationResponse = {
      reservationId: 1,
      orderId: "order-abc",
      amount: 300000,
    };
    mockedClient.post.mockResolvedValue({ data: reservation });

    // Act
    const result = await createReservation({ ticketSeatIds });

    // Assert
    expect(mockedClient.post).toHaveBeenCalledTimes(1);
    expect(mockedClient.post).toHaveBeenCalledWith("/reservation", { ticketSeatIds });
    expect(result).toEqual(reservation);
  });

  it("createReservation은 요청이 실패하면 에러를 그대로 던진다", async () => {
    // Arrange
    const error = new Error("Request failed");
    mockedClient.post.mockRejectedValue(error);

    // Act & Assert
    await expect(createReservation({ ticketSeatIds: [10] })).rejects.toBe(error);
  });
});
