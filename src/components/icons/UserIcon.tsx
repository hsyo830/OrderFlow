import clsx from "clsx";
import type { SVGProps } from "react";

interface UserIconProps extends Omit<SVGProps<SVGSVGElement>, "fill"> {
  fill?: boolean;
}

export default function UserIcon({ fill = false, className, ...props }: UserIconProps) {
  return (
    <svg
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {fill ? (
        <>
          {/* 몸통 */}
          <path
            d="M1 19.1124C1 15.3369 4.15429 12.2762 10.6 12.2762C17.0457 12.2762 20.2 15.3369 20.2 19.1124C20.2 19.7131 19.7618 20.2 19.2212 20.2H1.97882C1.43823 20.2 1 19.7131 1 19.1124Z"
            fill="currentColor"
          />

          {/* 머리 */}
          <path
            d="M14.2 4.6C14.2 6.58822 12.5882 8.2 10.6 8.2C8.61177 8.2 7 6.58822 7 4.6C7 2.61177 8.61177 1 10.6 1C12.5882 1 14.2 2.61177 14.2 4.6Z"
            fill="currentColor"
          />
        </>
      ) : (
        <>
          {/* 몸통 */}
          <path
            d="M1 19.1124C1 15.3369 4.15429 12.2762 10.6 12.2762C17.0457 12.2762 20.2 15.3369 20.2 19.1124C20.2 19.7131 19.7618 20.2 19.2212 20.2H1.97882C1.43823 20.2 1 19.7131 1 19.1124Z"
            stroke="currentColor"
            strokeWidth={2}
          />

          {/* 머리 */}
          <path
            d="M14.2 4.6C14.2 6.58822 12.5882 8.2 10.6 8.2C8.61177 8.2 7 6.58822 7 4.6C7 2.61177 8.61177 1 10.6 1C12.5882 1 14.2 2.61177 14.2 4.6Z"
            stroke="currentColor"
            strokeWidth={2}
          />
        </>
      )}
    </svg>
  );
}
