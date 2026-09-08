import ReservationListItem from "./ReservationListItem";

const reservations = [
  {
    id: 1,
    title: "IU CONCERT : THE WINNING",
    image: "/images/tickets/iu.jpg",
    date: "2026.06.21",
    time: "19:00",
    venue: "KSPO DOME",
    seat: "R구역 3열 6번",
    price: 154000,
    status: "예매 완료",
  },
  {
    id: 2,
    title: "BLACKPINK WORLD TOUR",
    image: "/images/tickets/blackpink.jpg",
    date: "2026.07.05",
    time: "18:00",
    venue: "고척스카이돔",
    seat: "VIP구역 2열 11번",
    price: 198000,
    status: "예매 완료",
  },
];

const ReservationList = () => {
  return (
    <section>
      <h2 className="mb-6 text-xl font-bold">내 예매 내역</h2>

      <div className="flex flex-col gap-4">
        {reservations.map((reservation) => (
          <ReservationListItem key={reservation.id} data={reservation} />
        ))}
      </div>
    </section>
  );
};

export default ReservationList;
