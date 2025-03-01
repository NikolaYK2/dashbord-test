// src/common/hooks/useSearch.ts
import { useMemo, useState } from "react";

export function useSearch<T>(data: T[], searchKey: keyof T) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) => String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm, searchKey]);

  return { searchTerm, setSearchTerm, filteredData };
}
