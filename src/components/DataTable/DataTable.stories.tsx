import { useCallback, useEffect, useState } from "react";
import { ComponentMeta } from "@storybook/react";
import DataTable, { Pagination } from "./DataTable";
import { HStack, IconButton } from "@chakra-ui/react";
import { MdArrowRightAlt, MdDelete } from "react-icons/md";
import { format, parseISO } from "date-fns";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const firstPage = {
  data: [
    {
      name: "John",
      email: "john@email.com",
      created_at: new Date().toISOString(),
    },
    {
      name: "Patrick",
      email: "patrick@email.com",
      created_at: new Date().toISOString(),
    },
  ],
  pagination: {
    total: 4,
    perPage: 2,
    page: 1,
    lastPage: 2,
  },
};

const secondPage = {
  data: [
    {
      name: "James",
      email: "james@email.com",
      created_at: new Date().toISOString(),
    },
    {
      name: "Neymar",
      email: "neymar@email.com",
      created_at: new Date().toISOString(),
    },
  ],
  pagination: {
    total: 4,
    perPage: 2,
    page: 2,
    lastPage: 2,
  },
};

const getColumns = () => [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Created at",
    accessor: (row: { created_at: string }) =>
      format(parseISO(row.created_at), "Pp"),
    id: "createdAt",
  },
  {
    Header: "Actions",
    Cell: () => (
      <HStack>
        <IconButton
          aria-label="Edit user"
          icon={<MdArrowRightAlt size={22} />}
        />
        <IconButton aria-label="Delete user" icon={<MdDelete size={22} />} />
      </HStack>
    ),
  },
];

export const Primary = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<typeof firstPage["data"]>([]);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);
  const [page, setPage] = useState(1);

  const loadData = useCallback(async () => {
    setLoading(true);
    const dataToUse: { [x: number]: typeof firstPage } = {
      1: firstPage,
      2: secondPage,
    };

    await sleep(1000);
    setData(dataToUse[page].data);
    setPagination(dataToUse[page].pagination);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <DataTable
      data={data}
      columns={getColumns()}
      perPage={2}
      pagination={pagination}
      page={page}
      onChangePage={setPage}
      isLoading={loading}
    />
  );
};

const config = {
  title: "DataTable",
  component: DataTable,
} as ComponentMeta<typeof DataTable>;

export default config;
