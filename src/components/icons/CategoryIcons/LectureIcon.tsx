import clsx from "clsx";
import type { SVGProps } from "react";

type LectureIconProps = SVGProps<SVGSVGElement>;

export default function LectureIcon({ className, ...props }: LectureIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {/* 뒤쪽 책 받침 / 외곽 */}
      <path
        d="
          M9 15H4
          V55H60
          V15H55
        "
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 왼쪽 펼쳐진 책장 */}
      <path
        d="
          M9 12
          C17 9 24 9 32 15
          V53
          C24 47 17 46 9 49
          V12Z
        "
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 오른쪽 펼쳐진 책장 */}
      <path
        d="
          M32 15
          C40 9 47 9 55 12
          V49
          C47 46 40 47 32 53
          V15Z
        "
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 가운데 제본선 */}
      <path
        d="M32 15V53"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 책 아래쪽 받침선 */}
      <path
        d="M9 49V52H26C28 52 30 53 32 54C34 53 36 52 38 52H55V49"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
