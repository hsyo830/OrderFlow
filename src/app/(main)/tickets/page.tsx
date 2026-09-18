import { Suspense } from "react";

import TicketPage from "@/views/tickets/TicketPage";

const Tickets = () => {
  return (
    <main>
      <Suspense fallback={<div>불러오는 중...</div>}>
        <TicketPage />
      </Suspense>
    </main>
  );
};

export default Tickets;
