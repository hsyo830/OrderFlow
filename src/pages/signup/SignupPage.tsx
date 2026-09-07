"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/common/Button";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { validateEmail, validatePassword, validatePasswordConfirm } from "@/utils/validator";

const SignupPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setPasswordConfirmError("");

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirmValid = validatePasswordConfirm(password, passwordConfirm);

    if (!isEmailValid) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    }

    if (!isPasswordValid) {
      setPasswordError("비밀번호는 6자 이상 입력해주세요.");
    }

    if (!isPasswordConfirmValid) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    }

    if (!isEmailValid || !isPasswordValid || !isPasswordConfirmValid) {
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data.user) {
      setUser(data.user);
      router.replace("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-border flex flex-col items-center gap-10 rounded-md border px-10 py-15">
        <div className="text-2xl font-bold">회원가입</div>

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

          <div className="mt-5 mb-1.5 text-base font-bold">비밀번호 확인</div>
          <div className="relative w-85">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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

          {passwordConfirmError && (
            <p className="text-danger mt-1.5 text-sm">{passwordConfirmError}</p>
          )}

          <Button type="submit" variant="primary" className="mt-7 w-full">
            회원가입
          </Button>
        </form>

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
