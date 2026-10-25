import { client } from "@/lib/client/client";
import { CreateReservationRequest, CreateReservationResponse } from "@/types/reservation";

// 예약 생성 시 좌석 상태는 HOLD → PAYMENT_PENDING으로 바뀐다.
// TODO(백엔드 미확정): PAYMENT_PENDING 만료 시간, 같은 좌석 재요청 시 응답, 4xx 에러 코드 구분
export const createReservation = async (
  request: CreateReservationRequest,
): Promise<CreateReservationResponse> => {
  const response = await client.post("/reservation", request);

  return response.data;
};
