import clsx from "clsx";
import type { SVGProps } from "react";

type EtcIconProps = SVGProps<SVGSVGElement>;

export default function EtcIcon({ className, ...props }: EtcIconProps) {
  return (
    <svg
      viewBox="0 0 348 297"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="currentColor"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      <circle cx="82" cy="144" r="23" />
      <circle cx="168" cy="144" r="23" />
      <circle cx="254" cy="144" r="23" />
    </svg>
  );
}
