import Container from "@/components/layout/Container";

import ReservationSteps from "./components/ReservationSteps";

const ReservationPage = () => {
  return (
    <div className="flex w-full justify-center">
      <Container>
        <ReservationSteps />
      </Container>
    </div>
  );
};

export default ReservationPage;
