import clsx from "clsx";
import type { SVGProps } from "react";

type ChevronRightIconProps = SVGProps<SVGSVGElement>;

export default function ChevronRightIcon({ className, ...props }: ChevronRightIconProps) {
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
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
