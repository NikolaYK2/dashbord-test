import { Typography } from "@/common/components/typography";
import { Find } from "@/common/components/find";
import { TableBody, TableHead, TableRoot, TableTd, TableTh, TableTr } from "@/common/components/table";
import { Icon } from "@/common/components/icons/Icon.tsx";
import { Button } from "@/common/components/button/Button.tsx";
import { NavLink } from "react-router";
import { Page } from "@/common/components/page";
import s from "./Dashboard.module.scss";
import { getDomainFromUrl } from "@/common/utils";
import { useSearch, useSort } from "@/common/hooks";
import { ResTests } from "@/features/dashboard/api/dashboardApiType.ts";
import { useDashboardData } from "@/features/dashboard/lib/hooks/useDashboardData.ts";
import { getValue } from "@/features/dashboard/lib/utils";

type TableHeaders = {
  name?: string;
};
const TABLE_HEADERS: TableHeaders[] = [{ name: "name" }, { name: "type" }, { name: "status" }, { name: "site" }];

const stylesTableHead = {
  ASC: {
    transform: "rotateX(180deg)",
  },
  DESC: {
    transform: "rotateX(0deg)",
  },
  DEFAULT: {
    opacity: "0",
  },
};

const styleColorsStatus: Record<ResTests["status"], string> = {
  ONLINE: s.onlineStatus,
  PAUSED: s.pausedStatus,
  DRAFT: s.draftStatus,
  STOPPED: s.stoppedStatus,
};

const styleColorsName: Record<ResTests["status"], string> = {
  ONLINE: s.onlineName,
  PAUSED: s.pausedName,
  DRAFT: s.draftName,
  STOPPED: s.stoppedName,
};

export const Dashboard = () => {
  const { dataSites, allTests, isLoading } = useDashboardData();

  // Хук поиска, здесь ищем по полю "name"
  const { searchTerm, setSearchTerm, filteredData: searchedTests } = useSearch<ResTests>(allTests, "name");

  // Хук сортировки, который управляет состоянием столбца и порядка сортировки
  const { sortedColumn, sortOrder, handleSort, sortedData } = useSort<ResTests>(searchedTests, getValue);

  const handlerReset = () => {
    setSearchTerm("");
  };

  return (
    <Page title={"Dashboard"}>
      <Find
        className={s.find}
        quantityTest={searchedTests.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isLoading ? (
        <div className={s.loading}>...Loading</div>
      ) : searchTerm && searchedTests.length < 1 ? (
        <section className={s.containerNotData}>
          <Typography variant={"monBold18"}>Your search did not match any results.</Typography>
          <Button className={s.btnReset} onClick={handlerReset}>
            <Typography variant={"monBold12"}>Reset</Typography>
          </Button>
        </section>
      ) : (
        <TableRoot className={s.tableRoot}>
          <TableHead className={s.head}>
            <TableTr className={s.htr}>
              {TABLE_HEADERS.map((header) => (
                <TableTh className={s.hth} key={header.name}>
                  <Button
                    className={s.hItem}
                    variant={"link"}
                    onClick={() => handleSort(header.name as keyof ResTests)}
                  >
                    <Typography variant={"robBold11"}>{header.name}</Typography>
                    <Icon
                      className={s.hIcon}
                      style={header.name === sortedColumn ? stylesTableHead[sortOrder] : stylesTableHead["DEFAULT"]}
                      iconId={"Arrow"}
                      width={7}
                      height={4}
                    />
                  </Button>
                </TableTh>
              ))}
            </TableTr>
          </TableHead>

          <TableBody className={s.body}>
            {sortedData.map((row) => (
              <TableTr className={s.btr} key={row.name}>
                <TableTd className={s.btd}>
                  <div className={`${s.bcolor} ${styleColorsName[row.status]}`} />
                  <Typography className={s.tdName} variant={"robBold13"}>
                    {row.name}
                  </Typography>
                </TableTd>
                <TableTd className={s.btd}>
                  <Typography className={`${s.tdType} ${row.type === "MVT" && s.modLitter}`} variant={"robReg12"}>
                    {row.type}
                  </Typography>
                </TableTd>
                <TableTd className={s.btd}>
                  <Typography className={`${s.tdStatus} ${styleColorsStatus[row.status]}`} variant={"robRBold12"}>
                    {row.status}
                  </Typography>
                </TableTd>
                <TableTd className={s.btd}>
                  <Typography className={s.tdSite} variant={"robReg12"}>
                    {getDomainFromUrl(dataSites.find((site) => site.id === row.siteId)?.url) || "Не найден"}
                  </Typography>
                </TableTd>
                <TableTd className={s.btd}>
                  <Button
                    className={s.bButton}
                    as={NavLink}
                    to={`/${row.status === "DRAFT" ? "finalize" : "results"}/${row.id}`}
                    variant={row.status === "DRAFT" ? "secondary" : "primary"}
                  >
                    <Typography variant={"monBold12"}>{row.status === "DRAFT" ? "finalize" : "results"}</Typography>
                  </Button>
                </TableTd>
              </TableTr>
            ))}
          </TableBody>
        </TableRoot>
      )}
    </Page>
  );
};
