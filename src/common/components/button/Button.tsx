import { ComponentPropsWithoutRef, ElementType } from "react";
import s from "./Button.module.scss";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  className?: string;
  fullWidth?: boolean;
  variant?: "link" | "primary" | "secondary";
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
  const { as: Component = "button", className, fullWidth, variant = "primary", ...restProps } = props;

  return <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ""} ${className}`} {...restProps} />;
};
