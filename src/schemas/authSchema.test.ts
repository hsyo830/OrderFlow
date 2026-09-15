import { describe, expect, it } from "vitest";

import { loginSchema, signupSchema } from "./authSchema";

describe("loginSchema", () => {
  describe("이메일 형식", () => {
    it("올바른 이메일 형식이면 통과한다.", () => {
      const result = loginSchema.safeParse({ email: "test@example.com", password: "qwerty" });
      expect(result.success).toBe(true);
    });

    it("잘못된 이메일 형식이면 실패하고 에러 메시지를 반환한다.", () => {
      const result = loginSchema.safeParse({ email: "testexample.com", password: "qwerty" });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toEqual([
          "올바른 이메일 형식을 입력해주세요.",
        ]);
      }
    });
  });

  describe("비밀번호 길이", () => {
    it("6자 이상이면 통과한다.", () => {
      const result = loginSchema.safeParse({ email: "test@example.com", password: "qwerty" });
      expect(result.success).toBe(true);
    });

    it("6자 미만이면 실패하고 에러 메시지를 반환한다.", () => {
      const result = loginSchema.safeParse({ email: "test@example.com", password: "qwert" });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toEqual([
          "비밀번호는 6자 이상 입력해주세요.",
        ]);
      }
    });
  });

  describe("복합 실패", () => {
    it("이메일과 비밀번호가 모두 유효하지 않으면 두 에러가 동시에 발생한다.", () => {
      const result = loginSchema.safeParse({ email: "bad-email", password: "ab" });

      expect(result.success).toBe(false);
      if (!result.success) {
        const { fieldErrors } = result.error.flatten();
        expect(fieldErrors.email).toEqual(["올바른 이메일 형식을 입력해주세요."]);
        expect(fieldErrors.password).toEqual(["비밀번호는 6자 이상 입력해주세요."]);
      }
    });

    it("이메일과 비밀번호가 빈 문자열이면 둘 다 실패한다.", () => {
      const result = loginSchema.safeParse({ email: "", password: "" });

      expect(result.success).toBe(false);
      if (!result.success) {
        const { fieldErrors } = result.error.flatten();
        expect(fieldErrors.email).toEqual(["올바른 이메일 형식을 입력해주세요."]);
        expect(fieldErrors.password).toEqual(["비밀번호는 6자 이상 입력해주세요."]);
      }
    });
  });
});

describe("signupSchema", () => {
  const valid = { email: "test@example.com", password: "qwerty", passwordConfirm: "qwerty" };

  describe("비밀번호 확인", () => {
    it("비밀번호와 확인이 일치하면 통과한다.", () => {
      const result = signupSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("비밀번호와 확인이 일치하지 않으면 passwordConfirm 경로에 에러를 반환한다.", () => {
      const result = signupSchema.safeParse({ ...valid, passwordConfirm: "qwert" });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.passwordConfirm).toEqual([
          "비밀번호가 일치하지 않습니다.",
        ]);
      }
    });
  });

  describe("비밀번호 길이와 확인 검증의 독립성", () => {
    it("비밀번호가 6자 미만이어도 확인값과 동일하면 확인 에러는 발생하지 않는다.", () => {
      const result = signupSchema.safeParse({
        email: "test@example.com",
        password: "abc",
        passwordConfirm: "abc",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const { fieldErrors } = result.error.flatten();
        expect(fieldErrors.password).toEqual(["비밀번호는 6자 이상 입력해주세요."]);
        expect(fieldErrors.passwordConfirm).toBeUndefined();
      }
    });
  });
});
