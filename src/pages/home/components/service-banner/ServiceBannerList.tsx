import MobileAppCard from "./MobileAppCard";
import QueueServiceCard from "./QueueServiceCard";
import TicketAlertCard from "./TicketAlertCard";

const ServiceBannerList = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <QueueServiceCard />
      <TicketAlertCard />
      <MobileAppCard />
    </div>
  );
};

export default ServiceBannerList;
