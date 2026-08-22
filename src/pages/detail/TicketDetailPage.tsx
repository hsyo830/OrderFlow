import Container from "@/components/layout/Container";

import TicketDetailTopBanner from "./components/TicketDetailTopBanner";

const TicketDetailPage = () => {
  return (
    <div>
      <TicketDetailTopBanner />
      <div className="mt-10 flex justify-center">{/* <Container></Container> */}</div>
    </div>
  );
};

export default TicketDetailPage;
