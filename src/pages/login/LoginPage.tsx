"use client";

import Link from "next/link";
import { useState } from "react";

import EyeIcon from "@/components/icons/EyeIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-border flex flex-col items-center gap-10 rounded-md border px-10 py-15">
        <div className="text-2xl font-bold">로그인</div>

        <div>
          <div className="mb-1.5 text-base font-bold">이메일</div>
          <input
            type="email"
            className="hover:border-input-border-hover active:border-input-border-hover border-border bg-input w-85 rounded-md border p-3 text-sm"
            placeholder="이메일을 입력해주세요."
          />

          <div className="mt-5 mb-1.5 text-base font-bold">비밀번호</div>
          <div className="relative w-85">
            <input
              type={showPassword ? "text" : "password"}
              className="hover:border-input-border-hover active:border-input-border-hover border-border bg-input w-full rounded-md border py-3 pr-11 pl-3 text-sm"
              placeholder="비밀번호를 입력해주세요."
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeOffIcon className="text-placeholder size-3" />
              ) : (
                <EyeIcon className="text-placeholder size-3" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover active:bg-primary-active text-inverse w-full cursor-pointer rounded-md py-3"
        >
          로그인
        </button>
        <div>
          계정이 없으신가요?&nbsp;
          <Link href="/signup" className="text-brand hover:text-brand-hover font-semibold">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
