import clsx from "clsx";
import type { SVGProps } from "react";

type ChevronLeftIconProps = SVGProps<SVGSVGElement>;

export default function ChevronLeftIcon({ className, ...props }: ChevronLeftIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
