import { Typography } from "@/common/components/typography";
import { Find } from "@/common/components/find";
import { TableBody, TableHead, TableRoot, TableTd, TableTh, TableTr } from "@/common/components/table";
import { Icon } from "@/common/components/icons/Icon.tsx";
import { Button } from "@/common/components/button/Button.tsx";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Page } from "@/common/components/page";
import s from "./Dashboard.module.scss";

type TableHeaders = {
  name?: string;
};
const TABLE_HEADERS: TableHeaders[] = [{ name: "name" }, { name: "type" }, { name: "status" }, { name: "site" }];

type TableBody = {
  name: string;
  type: string;
  status: {
    id: string;
    value: "online" | "paused" | "draft" | "stopped";
    color: "green" | "red" | "black" | "orange";
  };
  site: string;
  button: { title: "result" | "finalized"; id: string };
  color: string;
};

const TABLE_BODY: TableBody[] = [
  {
    color: "red",
    name: "name",
    type: "type",
    status: { id: "3", color: "red", value: "stopped" },
    site: "site",
    button: { title: "result", id: "1" },
  },
  {
    color: "black",
    name: "name1",
    type: "type",
    status: { id: "4", color: "black", value: "draft" },
    site: "site4",
    button: { title: "finalized", id: "2" },
  },
  {
    color: "white",
    name: "name2",
    type: "type",
    status: { id: "1", color: "green", value: "online" },
    site: "site1",
    button: { title: "result", id: "3" },
  },
  {
    color: "brown",
    name: "name3",
    type: "type",
    status: { id: "2", color: "orange", value: "paused" },
    site: "site3",
    button: { title: "result", id: "4" },
  },
  {
    color: "blue",
    name: "name4",
    type: "type",
    status: { id: "1", color: "green", value: "online" },
    site: "site2",
    button: { title: "result", id: "5" },
  },
];

const sorters = {
  ASC: (a: string, b: string) => (a > b ? 1 : -1),
  DESC: (a: string, b: string) => (a < b ? 1 : -1),
  DEFAULT: null,
};
export const Dashboard = () => {
  //для поиска
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  // Состояние для данных таблицы
  const [data, setData] = useState<TableBody[]>(TABLE_BODY);
  console.log(data, "data");
  // Состояния: какой столбец сортируется и порядок сортировки
  const [sortedColumn, setSortedColumn] = useState<keyof TableBody | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | "DEFAULT">("DEFAULT");

  const getFind = (TABLE_BODY: TableBody[]) => {
    setData(TABLE_BODY.filter((test) => test.name.toLowerCase().includes(searchTerm)));
  };

  const handlerReset = () => {
    // setData(TABLE_BODY);
    setSearchTerm("");
  };

  // Функция для получения сортируемого значения по ключу
  const getValue = (row: TableBody, key: keyof TableBody): string => {
    // Если сортировка по столбцу status, берем его value
    if (key === "status") {
      return row.status.id;
    }
    if (key === "button") {
      return row.button.id;
    }
    return row[key];
  };

  const handleSort = (column: keyof TableBody) => {
    let nextOrder: "ASC" | "DESC" | "DEFAULT";
    // Если сортировка по новому столбцу – начинаем с ASC
    if (sortedColumn !== column) {
      nextOrder = "ASC";
    } else {
      // Если сортируем по тому же столбцу, меняем порядок
      if (sortOrder === "DEFAULT") nextOrder = "ASC";
      else if (sortOrder === "ASC") nextOrder = "DESC";
      else if (sortOrder === "DESC") nextOrder = "DEFAULT";
      else nextOrder = "ASC";
    }

    setSortedColumn(column);
    setSortOrder(nextOrder);

    if (nextOrder === "DEFAULT") {
      // Сброс сортировки – возвращаем исходный порядок
      setData(TABLE_BODY);
    } else {
      // Сортировка копии данных по выбранному столбцу
      const sortedData = [...data].sort((a, b) => {
        const aVal = getValue(a, column);
        const bVal = getValue(b, column);
        return sorters[nextOrder](aVal, bVal);
      });
      setData(sortedData);
    }
  };

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

  useEffect(() => {
    getFind(TABLE_BODY);
  }, [searchTerm]);

  return (
    <Page title={"Dashboard"}>

      <Find className={s.find} quantityTest={data.length} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {data.length < 1 ? (
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
                    onClick={() => handleSort(header.name as keyof TableBody)}
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
            {data.map((row) => (
              <TableTr className={s.btr} key={row.name}>
                <TableTd className={s.btd}>
                  <div className={s.bcolor} style={{ background: `${row.color}` }} />
                  <Typography variant={"robBold13"}>{row.name}</Typography>
                </TableTd>
                <TableTd className={s.btd}>
                  <Typography className={s.tdType} variant={"robReg12"}>
                    {row.type}
                  </Typography>
                </TableTd>
                <TableTd className={s.btd} style={{ color: `${row.status.color}` }}>
                  <Typography variant={"robRBold12"}>{row.status.value}</Typography>
                </TableTd>
                <TableTd className={s.btd}>
                  <Typography className={s.tdSite} variant={"robReg12"}>
                    {row.site}
                  </Typography>
                </TableTd>
                <TableTd className={s.btd}>
                  <Button
                    className={s.bButton}
                    as={NavLink}
                    to={`/${row.button.title}/${row.button.id}`}
                    variant={row.button.title === "finalized" ? "secondary" : "primary"}
                  >
                    <Typography variant={"monBold12"}>{row.button.title}</Typography>
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
