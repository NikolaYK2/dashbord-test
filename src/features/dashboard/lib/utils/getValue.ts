import { ResTests } from "@/features/dashboard/api/dashboardApiType.ts";

const statusPriority: Record<ResTests["status"], number> = {
  ONLINE: 1,
  PAUSED: 2,
  STOPPED: 3,
  DRAFT: 4,
};
// Функция для получения значения для сортировки
export const getValue = (row: ResTests, key: keyof ResTests): string | number => {
  if (key === "status") {
    return statusPriority[row.status];
  }
  return String(row[key]);
};
