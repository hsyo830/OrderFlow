/** 순서를 무시하고 두 좌석 id 목록이 같은 집합인지 비교한다 ([3, 1]과 [1, 3]은 같다) */
export const isSameSeatSet = (a: number[], b: number[]): boolean => {
  const setA = new Set(a);
  const setB = new Set(b);

  if (setA.size !== setB.size) return false;

  return [...setA].every((id) => setB.has(id));
};
