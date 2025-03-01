import { useEffect, useState } from "react";
import { ResSites, ResTests } from "@/features/dashboard/api/dashboardApiType.ts";
import { dashboardApi } from "@/features/dashboard/api/dashboardApi.ts";

export const useDashboardData = () => {
  const [allTests, setAllTests] = useState<ResTests[]>([]);
  const [dataSites, setDataSites] = useState<ResSites[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [tests, sites] = await Promise.all([dashboardApi.getTests(), dashboardApi.getSites()]);
        setAllTests(tests);
        setDataSites(sites);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return { allTests, dataSites, isLoading };
};
