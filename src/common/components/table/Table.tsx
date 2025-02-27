import { ComponentPropsWithoutRef, forwardRef } from "react";

type TableRootProps = ComponentPropsWithoutRef<"table">;
export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(({ children, className, ...props }, ref) => {
  return (
    <table className={className} {...props} ref={ref}>
      {children}
    </table>
  );
});

type TableHeadProps = ComponentPropsWithoutRef<"thead">;
export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <thead className={className} {...props} ref={ref}>
        {children}
      </thead>
    );
  },
);

type TableTrProps = ComponentPropsWithoutRef<"tr">;
export const TableTr = forwardRef<HTMLTableRowElement, TableTrProps>(({ children, className, ...props }, ref) => {
  return (
    <tr className={className} {...props} ref={ref}>
      {children}
    </tr>
  );
});

type TableThProps = ComponentPropsWithoutRef<"th">;
export const TableTh = forwardRef<HTMLTableCellElement, TableThProps>(({ children, className, ...props }, ref) => {
  return (
    <th className={className} {...props} ref={ref}>
      {children}
    </th>
  );
});

type TableTdProps = ComponentPropsWithoutRef<"td">;
export const TableTd = forwardRef<HTMLTableCellElement, TableTdProps>(({ children, className, ...props }, ref) => {
  return (
    <td className={className} {...props} ref={ref}>
      {children}
    </td>
  );
});

type TableBodyProps = ComponentPropsWithoutRef<"tbody">;
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <tbody className={className} {...props} ref={ref}>
        {children}
      </tbody>
    );
  },
);
