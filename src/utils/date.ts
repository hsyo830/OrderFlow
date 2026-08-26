export const getDDay = (startDate: string) => {
  const start = new Date(`${startDate}T00:00:00+09:00`);

  const today = new Date();
  const koreaToday = new Date(
    today.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" }) + "T00:00:00+09:00",
  );

  const diffTime = start.getTime() - koreaToday.getTime();
  const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDay === 0) return "D-Day";
  if (diffDay > 0) return `D-${diffDay}`;

  return `D+${Math.abs(diffDay)}`;
};
