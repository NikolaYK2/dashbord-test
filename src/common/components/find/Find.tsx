import s from "./Find.module.scss";
import { Icon } from "@/common/components/icons/Icon.tsx";
import { Typography } from "@/common/components/typography";
import { ChangeEvent } from "react";

type FindProps = {
  quantityTest: number;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  className?: string;
};
export const Find = ({ quantityTest = 0, searchTerm, setSearchTerm, className = "" }: FindProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value.toLowerCase());
  };

  return (
    <section className={`${s.containerFind} ${className}`}>
      <input
        className={s.input}
        type="text"
        placeholder={"What test are you looking for?"}
        value={searchTerm}
        onChange={onChange}
      />
      <Icon className={s.icon} iconId={"Find"} width={14} height={14} />
      <Typography className={s.tests} variant={"robReg14"}>
        {quantityTest}
        <span>tests</span>
      </Typography>
    </section>
  );
};
