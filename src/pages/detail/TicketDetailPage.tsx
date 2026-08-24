import Container from "@/components/layout/Container";

import TicketDetailSection from "./components/ticketDetailSection/TicketDetailSection";
import TicketDetailTopBanner from "./components/TicketDetailTopBanner";

const TicketDetailPage = () => {
  return (
    <div>
      <TicketDetailTopBanner />
      <div className="mt-10 flex justify-center">
        <Container>
          <TicketDetailSection />
        </Container>
      </div>
    </div>
  );
};

export default TicketDetailPage;
