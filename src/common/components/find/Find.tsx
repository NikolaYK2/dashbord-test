import s from "./Find.module.scss";
import { Icon } from "@/common/components/icons/Icon.tsx";

export const Find = () => {
  return (
    <section className={s.containerFind}>
      <input className={s.input} type="search" placeholder={"What test are you looking for?"} />
      <Icon className={s.icon} iconId={"Find"} width={14} height={14} />
    </section>
  );
};
