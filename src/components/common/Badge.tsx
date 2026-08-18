type BadgeVariant = "basic" | "darkOpacity";

type BadgeProps = {
  variant?: BadgeVariant;
  text: string;
  className?: string;
};

const Badge = ({ variant = "basic", text, className = "" }: BadgeProps) => {
  const variantStyles = {
    basic: {
      backgroundColor: "var(--color-brand)",
      color: "var(--color-text-inverse)",
    },
    darkOpacity: {
      backgroundColor: "var(--color-dark-button-opacity)",
      color: "var(--color-dark-button-foreground)",
    },
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide md:px-3 md:py-1 md:text-xs ${className}`}
      style={variantStyles[variant]}
    >
      {text}
    </span>
  );
};

export default Badge;
