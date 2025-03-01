import { useMemo, useState } from "react";

export type SortOrder = "ASC" | "DESC" | "DEFAULT";

const sorters = {
  ASC: (a: string | number, b: string | number) => (a > b ? 1 : -1),
  DESC: (a: string | number, b: string | number) => (a < b ? 1 : -1),
  DEFAULT: null,
};

export function useSort<T>(
  data: T[],
  getValue: (item: T, key: keyof T) => string | number,
  // sorters: Record<"ASC" | "DESC", (a: string | number, b: string | number) => number>
) {
  const [sortedColumn, setSortedColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("DEFAULT");

  const sortedData = useMemo(() => {
    if (!sortedColumn || sortOrder === "DEFAULT") return data;
    return [...data].sort((a, b) => {
      const aVal = getValue(a, sortedColumn);
      const bVal = getValue(b, sortedColumn);
      return sorters[sortOrder](aVal, bVal);
    });
  }, [data, sortedColumn, sortOrder, getValue, sorters]);

  const handleSort = (column: keyof T) => {
    let nextOrder: SortOrder;
    if (sortedColumn !== column) {
      nextOrder = "ASC";
    } else {
      if (sortOrder === "DEFAULT") nextOrder = "ASC";
      else if (sortOrder === "ASC") nextOrder = "DESC";
      else if (sortOrder === "DESC") nextOrder = "DEFAULT";
      else nextOrder = "ASC";
    }
    setSortedColumn(column);
    setSortOrder(nextOrder);
  };

  return { sortedColumn, sortOrder, sortedData, handleSort };
}
