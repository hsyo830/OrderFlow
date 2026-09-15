"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import { createClient } from "@/lib/supabase/client";
import { type SignupFormValues, signupSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/stores/authStore";

const SignupPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async ({ email, password }: SignupFormValues) => {
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
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="border-border flex w-full max-w-md flex-col items-center gap-10 rounded-md border px-6 py-10 sm:px-10 sm:py-15">
        <div className="text-2xl font-bold">회원가입</div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <div className="mb-2 text-base font-bold">이메일</div>
          <input
            type="email"
            {...register("email")}
            className="hover:border-input-border-hover active:border-input-border-hover border-border bg-input w-full rounded-md border p-3 text-sm"
            placeholder="이메일을 입력해주세요."
          />

          {errors.email && <p className="text-danger mt-1.5 text-sm">{errors.email.message}</p>}

          <div className="mt-6 mb-2 text-base font-bold">비밀번호</div>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
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

          {errors.password && (
            <p className="text-danger mt-1.5 text-sm">{errors.password.message}</p>
          )}

          <div className="mt-6 mb-2 text-base font-bold">비밀번호 확인</div>
          <div className="relative w-full">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              {...register("passwordConfirm")}
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

          {errors.passwordConfirm && (
            <p className="text-danger mt-1.5 text-sm">{errors.passwordConfirm.message}</p>
          )}

          <Button type="submit" variant="primary" className="mt-8 w-full">
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
