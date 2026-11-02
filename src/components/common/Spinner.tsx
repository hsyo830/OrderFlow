import { cn } from "@/lib/cn/utils";

type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "border-border border-t-brand size-10 rounded-full border-4 motion-safe:animate-spin",
        className,
      )}
    />
  );
};

export default Spinner;
