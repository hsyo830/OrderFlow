import { client } from "@/lib/client/client";
import { TicketSeat } from "@/types/seat";

export const fetchTicketSeats = async (ticketId: number): Promise<TicketSeat[]> => {
  const response = await client.get(`/ticketSeat/${ticketId}`);

  return response.data;
};

export const holdSeat = async (ids: number[], holdUserId: string): Promise<void> => {
  await client.patch("/ticketSeat/hold", { holdUserId, ids });
};

export const releaseSeat = async (ids: number[], holdUserId: string): Promise<void> => {
  await client.patch("/ticketSeat/cancel", { holdUserId, ids });
};

export const extendHold = async (ids: number[], holdUserId: string): Promise<void> => {
  await client.patch("/ticketSeat/extend", { holdUserId, ids });
};
