import Container from "@/components/layout/Container";

import MyPageSidebar from "./components/MyPageSidebar";
import ReservationList from "./components/ReservationList";

const MyPage = () => {
  return (
    <div className="mt-15 flex w-full justify-center">
      <Container>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">마이페이지</h1>
          <p className="mt-2 text-sm text-gray-500">예매한 공연을 확인할 수 있습니다.</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <MyPageSidebar />

          <main className="min-w-0 flex-1">
            <ReservationList />
          </main>
        </div>
      </Container>
    </div>
  );
};

export default MyPage;
