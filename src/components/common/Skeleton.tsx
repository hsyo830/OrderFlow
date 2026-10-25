import { cn } from "@/lib/cn/utils";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn("bg-surface-3 relative overflow-hidden rounded-md", className)}
    >
      {/* reduced-motion 환경에서는 애니메이션 없이 -translate-x-full 위치에 머물러 overflow로 가려진다 */}
      <div className="via-surface motion-safe:animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-transparent to-transparent" />
    </div>
  );
};

export default Skeleton;
