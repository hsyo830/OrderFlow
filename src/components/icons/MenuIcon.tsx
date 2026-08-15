import clsx from "clsx";
import type { SVGProps } from "react";

interface MenuIconProps extends Omit<SVGProps<SVGSVGElement>, "fill"> {
  fill?: boolean;
}

export default function MenuIcon({ fill = false, className, ...props }: MenuIconProps) {
  return (
    <svg
      viewBox="0 0 18 14"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {fill ? (
        <path
          d="M1 0H17C17.5523 0 18 0.447715 18 1C18 1.55228 17.5523 2 17 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0ZM1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6ZM1 12H17C17.5523 12 18 12.4477 18 13C18 13.5523 17.5523 14 17 14H1C0.447715 14 0 13.5523 0 13C0 12.4477 0.447715 12 1 12Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M17 13H1M17 7H1M17 1H1"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
