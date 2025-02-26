import { ComponentPropsWithoutRef, ElementType } from "react";
import s from "src/common/components/typography/Typography.module.scss";

type VariantType =
  | "h1"
  | "monBold12"
  | "monBold14"
  | "monBold18"
  | "nunito"
  | "robBold11"
  | "robReg12"
  | "robRBold12"
  | "robBold13"
  | "robReg14";

type TypographyProps<T extends ElementType = "p"> = {
  variant: VariantType;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export const Typography = <T extends ElementType = "p">(props: TypographyProps<T>) => {
  const { variant = "p", className, ...restProps } = props;
  const Component: ElementType = variant && getComponent(variant as VariantType);

  return <Component className={`${s[variant]} ${className}`} {...restProps} />;
};

function getComponent(variant: VariantType) {
  switch (variant) {
    case "h1": {
      return "h2";
    }
    case "monBold12":
    case "monBold14":
    case "monBold18":
    case "nunito":
    case "robBold11":
    case "robReg12":
    case "robRBold12":
    case "robBold13":
    case "robReg14": {
      return "p";
    }
    default: {
      return "span";
    }
  }
}
