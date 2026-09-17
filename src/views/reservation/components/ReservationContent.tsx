import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { fetchTicketSeats, holdSeat, releaseSeat } from "@/services/seatService";
import { useAuthStore } from "@/stores/authStore";
import { TicketSeat } from "@/types/seat";
import { TicketDetail } from "@/types/ticket";

import SeatMap from "./SeatMap";
import SelectedSeatSummary from "./SelectedSeatSummary";
import TicketInfo from "./TicketInfo";

const MAX_SELECTABLE_SEATS = 4;

type ReservationContentProps = {
  data: TicketDetail;
};

const ReservationContent = ({ data }: ReservationContentProps) => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
  const [pendingSeatIds, setPendingSeatIds] = useState<Set<number>>(new Set());
  const [seatError, setSeatError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const holdUserId = useAuthStore((state) => state.user?.id);

  const {
    data: ticketSeats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ticketSeats", data.id],
    queryFn: () => fetchTicketSeats(data.id),
  });

  const addPendingSeat = (seatId: number) => setPendingSeatIds((prev) => new Set(prev).add(seatId));

  const removePendingSeat = (seatId: number) =>
    setPendingSeatIds((prev) => {
      const next = new Set(prev);
      next.delete(seatId);
      return next;
    });

  const handleMutationError = (message: string) => {
    setSeatError(message);
    queryClient.invalidateQueries({ queryKey: ["ticketSeats", data.id] });
  };

  const holdMutation = useMutation({
    mutationFn: (seat: TicketSeat) => holdSeat([seat.id], holdUserId!),
    onMutate: (seat) => {
      setSeatError(null);
      addPendingSeat(seat.id);
    },
    onSuccess: (_result, seat) => {
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    },
    onError: () =>
      handleMutationError("좌석 선점에 실패했습니다. 다른 사용자가 먼저 선택했을 수 있어요."),
    onSettled: (_result, _err, seat) => removePendingSeat(seat.id),
  });

  const releaseMutation = useMutation({
    mutationFn: (seat: TicketSeat) => releaseSeat([seat.id], holdUserId!),
    onMutate: (seat) => {
      setSeatError(null);
      addPendingSeat(seat.id);
    },
    onSuccess: (_result, seat) => {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    },
    onError: () => handleMutationError("좌석 해제에 실패했습니다. 다시 시도해주세요."),
    onSettled: (_result, _err, seat) => removePendingSeat(seat.id),
  });

  // pendingSeatIds는 HOLD/release 요청 모두를 담는 "중복 클릭 방지"용 집합이다.
  // release pending 좌석은 selectedSeatIds에 이미 포함돼 있으므로(비낙관적 해제,
  // 응답 전까지 selectedSeatIds에서 안 빠짐) 그대로 pendingSeatIds.size를 더하면
  // 같은 좌석이 두 번 카운트된다. 4석 제한에는 "아직 selectedSeatIds에 없는"
  // HOLD pending 좌석만 더해야 한다.
  const pendingHoldSeatCount = Array.from(pendingSeatIds).filter(
    (seatId) => !selectedSeatIds.includes(seatId),
  ).length;
  const isSelectionFull = selectedSeatIds.length + pendingHoldSeatCount >= MAX_SELECTABLE_SEATS;

  const handleSeatClick = (seat: TicketSeat) => {
    if (pendingSeatIds.has(seat.id)) return;

    if (!holdUserId) {
      setSeatError("로그인 후 좌석을 선택할 수 있습니다.");
      return;
    }

    const isSelected = selectedSeatIds.includes(seat.id);

    if (isSelected) {
      releaseMutation.mutate(seat);
      return;
    }

    if (isSelectionFull) {
      setSeatError(`좌석은 최대 ${MAX_SELECTABLE_SEATS}석까지 선택할 수 있습니다.`);
      return;
    }

    holdMutation.mutate(seat);
  };

  const selectedSeats = ticketSeats?.filter((seat) => selectedSeatIds.includes(seat.id)) ?? [];
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="border-border rounded-xl border p-4 md:p-6">
      <TicketInfo data={data} />
      <div className="border-border my-5 border-t md:my-6" />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="min-w-0 flex-1">
          {isLoading && (
            <div className="text-muted flex h-40 items-center justify-center text-sm">
              좌석 정보를 불러오는 중...
            </div>
          )}
          {error && (
            <div className="text-muted flex h-40 items-center justify-center text-sm">
              좌석 정보를 불러오지 못했습니다.
            </div>
          )}
          {ticketSeats && (
            <SeatMap
              seats={ticketSeats}
              selectedSeatIds={selectedSeatIds}
              pendingSeatIds={pendingSeatIds}
              isSelectionFull={isSelectionFull}
              onSeatClick={handleSeatClick}
            />
          )}
          {seatError && <p className="text-danger mt-3 text-sm">{seatError}</p>}
        </div>
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          <SelectedSeatSummary
            selectedSeats={selectedSeats}
            totalAmount={totalAmount}
            maxSeats={MAX_SELECTABLE_SEATS}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationContent;
