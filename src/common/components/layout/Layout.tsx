import { ReactNode } from "react";
import s from "./Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {
  return <main className={s.main}>{children}</main>;
};
