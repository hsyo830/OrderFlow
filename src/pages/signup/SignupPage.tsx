"use client";

import Link from "next/link";
import { useState } from "react";

import EyeIcon from "@/components/icons/EyeIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-border flex flex-col items-center gap-10 rounded-md border px-10 py-15">
        <div className="text-2xl font-bold">회원가입</div>

        <div>
          <div className="mb-1.5 text-base font-bold">아이디</div>
          <input
            type="text"
            className="hover:border-input-border-hover active:border-input-border-hover border-border bg-input w-85 rounded-md border p-3 text-sm"
            placeholder="아이디를 입력해주세요."
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

          <div className="mt-5 mb-1.5 text-base font-bold">비밀번호 확인</div>
          <div className="relative w-85">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              className="hover:border-input-border-hover active:border-input-border-hover border-border bg-input w-full rounded-md border py-3 pr-11 pl-3 text-sm"
              placeholder="비밀번호를 다시 입력해주세요."
            />

            <button
              type="button"
              onClick={() => setShowPasswordConfirm((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              {showPasswordConfirm ? (
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
          회원가입
        </button>
        <div>
          이미 계정이 있으신가요?&nbsp;
          <Link href="/login" className="text-brand hover:text-brand-hover font-semibold">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
