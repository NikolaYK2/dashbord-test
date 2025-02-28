import { Button } from "@/common/components/button/Button.tsx";
import { NavLink } from "react-router";
import { Icon } from "@/common/components/icons/Icon.tsx";
import { Typography } from "@/common/components/typography";
import s from "./ToBack.module.scss";

type Props = {
  className?: string;
};
export const ToBack = ({ className = "" }: Props) => {
  return (
    <Button className={`${s.btn} ${className}`} as={NavLink} to={"/"} variant={"link"}>
      <Icon className={s.icon} iconId={"Arrow"} width={16} height={9} />
      <Typography variant={"nunito"}>Back</Typography>
    </Button>
  );
};
