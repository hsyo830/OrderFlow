import { describe, expect, it } from "vitest";

import { isSameSeatSet } from "./isSameSeatSet";

describe("isSameSeatSet", () => {
  it("순서가 달라도 같은 좌석이면 true", () => {
    expect(isSameSeatSet([3, 1], [1, 3])).toBe(true);
  });

  it("완전히 같은 배열이면 true", () => {
    expect(isSameSeatSet([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it("좌석 수가 다르면 false", () => {
    expect(isSameSeatSet([1, 2], [1, 2, 3])).toBe(false);
  });

  it("개수가 같아도 좌석이 다르면 false", () => {
    expect(isSameSeatSet([1, 2], [1, 3])).toBe(false);
  });

  it("한쪽이 비어 있으면 false", () => {
    expect(isSameSeatSet([], [1])).toBe(false);
    expect(isSameSeatSet([1], [])).toBe(false);
  });

  it("둘 다 비어 있으면 true", () => {
    expect(isSameSeatSet([], [])).toBe(true);
  });
});
