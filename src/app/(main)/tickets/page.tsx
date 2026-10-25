import { Suspense } from "react";

import TicketPageSkeleton from "@/views/tickets/components/TicketPageSkeleton";
import TicketPage from "@/views/tickets/TicketPage";

const Tickets = () => {
  return (
    <main>
      <Suspense fallback={<TicketPageSkeleton />}>
        <TicketPage />
      </Suspense>
    </main>
  );
};

export default Tickets;
