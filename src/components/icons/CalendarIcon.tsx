import clsx from "clsx";
import type { SVGProps } from "react";

type CalendarIconProps = SVGProps<SVGSVGElement>;

export default function CalendarIcon({ className, ...props }: CalendarIconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {/* 캘린더 외곽 */}
      <path
        d="M1.5 2.5C1.23478 2.5 0.98043 2.60536 0.792893 2.79289C0.605357 2.98043 0.5 3.23478 0.5 3.5V12.5C0.5 12.7652 0.605357 13.0196 0.792893 13.2071C0.98043 13.3946 1.23478 13.5 1.5 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3946 13.0196 13.5 12.7652 13.5 12.5V3.5C13.5 3.23478 13.3946 2.98043 13.2071 2.79289C13.0196 2.60536 12.7652 2.5 12.5 2.5H10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 상단 구분선 */}
      <path d="M0.5 6.5H13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />

      {/* 왼쪽 고리 */}
      <path d="M3.5 0.5V4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />

      {/* 오른쪽 고리 */}
      <path d="M10.5 0.5V4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />

      {/* 상단 연결선 */}
      <path d="M3.5 2.5H8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
