import { describe, expect, it } from "vitest";

import { validateEmail, validatePassword, validatePasswordConfirm } from "./validator";

describe("validateEmail", () => {
  it("올바른 이메일 형식이면 true를 반환한다.", () => {
    const result = validateEmail("test@example.com");
    expect(result).toBe(true);
  });

  it("잘못된 이메일 형식이면 false를 반환한다.", () => {
    const result = validateEmail("testexample.com");
    expect(result).toBe(false);
  });
});

describe("validatePassword", () => {
  it("올바른 비밀번호 형식이면 true를 반환한다.", () => {
    const result = validatePassword("qwerty");
    expect(result).toBe(true);
  });

  it("비밀번호가 6자 미만이면 false를 반환한다.", () => {
    const result = validatePassword("qwert");
    expect(result).toBe(false);
  });
});

describe("validatePasswordConfirm", () => {
  it("두 비밀번호 입력이 동일하면 true를 반환한다.", () => {
    const result = validatePasswordConfirm("qwerty", "qwerty");
    expect(result).toBe(true);
  });

  it("두 비밀번호가 다르면 false를 반환한다.", () => {
    const result = validatePasswordConfirm("qwerty", "qwert");
    expect(result).toBe(false);
  });
});
