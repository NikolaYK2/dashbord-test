import s from "./Page.module.scss";
import { ReactNode } from "react";
import { ToBack } from "@/common/components/toBack";
import { Typography } from "@/common/components/typography";
import { useLocation } from "react-router";

type PageProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
};
export const Page = ({ children, title, description = "" }: PageProps) => {
  const location = useLocation();
  return (
    <section className={s.containerPage}>
      <Typography className={s.h1} variant={"h1"}>
        {title}
      </Typography>
      {description && <Typography variant={"monBold14"}>{description}</Typography>}

      {children}
      {location.pathname !== "/" && <ToBack className={s.back} />}
    </section>
  );
};
