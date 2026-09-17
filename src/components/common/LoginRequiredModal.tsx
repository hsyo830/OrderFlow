"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";

const LoginRequiredModal = () => {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-dark-button-opacity)" }}
    >
      <div className="bg-surface w-full max-w-sm rounded-xl p-6 text-center shadow-lg">
        <p className="text-base font-medium">예매는 로그인 후 이용 가능합니다</p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline-neutral" className="flex-1" onClick={() => router.back()}>
            뒤로가기
          </Button>
          <Button variant="primary" className="flex-1" onClick={() => router.push("/login")}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
