const MyPageSidebar = () => {
  return (
    <aside className="border-border bg-surface h-fit w-full shrink-0 rounded-xl border p-5 lg:w-60">
      <h2 className="text-foreground mb-5 text-lg font-bold">마이페이지</h2>

      <div className="flex flex-col">
        <button
          type="button"
          className="bg-brand-soft text-brand hover:bg-brand-soft-hover cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors"
        >
          내 예매 내역
        </button>

        <div className="border-border my-4 border-t" />

        <button
          type="button"
          className="text-muted hover:text-foreground cursor-pointer px-4 py-3 text-left text-sm transition-colors"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default MyPageSidebar;
