"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Container from "@/components/layout/Container";
import { useAuthStore } from "@/stores/authStore";

import MyPageSidebar from "./components/MyPageSidebar";
import ReservationList from "./components/ReservationList";

const MyPage = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/");
    }
  }, [isInitialized, user, router]);

  if (!isInitialized || !user) {
    return null;
  }

  return (
    <div className="w-full py-10 md:py-14">
      <Container>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">마이페이지</h1>
          <p className="text-muted mt-2 text-sm">예매한 공연을 확인할 수 있습니다.</p>
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
