"use client";

import Link from "next/link";
import { useState } from "react";

import EyeIcon from "@/components/icons/EyeIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { validateEmail, validatePassword } from "@/utils/validator";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    }

    if (!isPasswordValid) {
      setPasswordError("비밀번호는 6자 이상 입력해주세요.");
    }

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    setUser(data.user);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-border flex flex-col items-center gap-10 rounded-md border px-10 py-15">
        <div className="text-2xl font-bold">로그인</div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-1.5 text-base font-bold">이메일</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="hover:border-input-border-hover active:border-input-border-hover border-border bg-input w-85 rounded-md border p-3 text-sm"
            placeholder="이메일을 입력해주세요."
          />
          {emailError && <p className="text-danger mt-1.5 text-sm">{emailError}</p>}

          <div className="mt-5 mb-1.5 text-base font-bold">비밀번호</div>
          <div className="relative w-85">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {passwordError && <p className="text-danger mt-1.5 text-sm">{passwordError}</p>}

          {loginError && <p className="text-danger mt-3 text-sm">{loginError}</p>}
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover active:bg-primary-active text-inverse mt-10 w-full cursor-pointer rounded-md py-3"
          >
            로그인
          </button>
        </form>

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
