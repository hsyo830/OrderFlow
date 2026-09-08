import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/lib/cn/utils";

type ButtonVariant = "primary" | "outline-primary" | "outline-neutral";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary hover:bg-primary-hover active:bg-primary-active text-inverse",
  "outline-primary":
    "bg-secondary border border-primary text-primary hover:bg-brand-soft active:bg-brand-soft-hover",
  "outline-neutral":
    "bg-secondary border border-foreground text-foreground hover:bg-secondary-hover active:bg-secondary-hover",
};

const Button = ({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
  href,
}: ButtonProps) => {
  const styles = cn(
    "cursor-pointer rounded-sm px-3 py-2 text-sm transition-colors md:rounded-md md:py-3 md:text-base disabled:cursor-not-allowed disabled:opacity-50 text-center",
    variantStyles[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
};

export default Button;
