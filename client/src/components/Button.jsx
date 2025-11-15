import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  onClick,
  ...props
}) {
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };

  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  const disabledClass = disabled ? "btn-disabled" : "";

  const finalClassName = [
    variantClasses[variant],
    sizeClasses[size],
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={finalClassName}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
