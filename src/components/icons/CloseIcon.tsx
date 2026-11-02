import clsx from "clsx";
import type { SVGProps } from "react";

export default function CloseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
