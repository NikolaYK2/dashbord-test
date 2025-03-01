import { instance } from "@app/instance.ts";
import { ResSites, ResTests } from "@/features/dashboard/api/dashboardApiType.ts";

const ENDPOINTS = {
  TESTS: "/tests",
  SITES: "/sites",
};
export const dashboardApi = {
  async getTests() {
    const res = await instance.get<ResTests[]>(ENDPOINTS.TESTS);
    return res.data;
  },
  async getSites() {
    const res = await instance.get<ResSites[]>(ENDPOINTS.SITES);
    return res.data;
  },
};
