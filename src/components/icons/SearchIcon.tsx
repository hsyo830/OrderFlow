import clsx from "clsx";
import type { SVGProps } from "react";
import { useId } from "react";

type SearchIconProps = SVGProps<SVGSVGElement>;

export default function SearchIcon({ className, ...props }: SearchIconProps) {
  const maskId = useId();

  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">
          {/* 전체 원 */}
          <circle cx="256" cy="256" r="235" fill="white" />

          {/* 돋보기 원형 구멍 */}
          <circle cx="242" cy="242" r="93" fill="none" stroke="black" strokeWidth="21" />

          {/* 돋보기 손잡이 구멍 */}
          <path d="M309 309L363 363" stroke="black" strokeWidth="21" strokeLinecap="round" />
        </mask>
      </defs>

      <circle cx="256" cy="256" r="235" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}
