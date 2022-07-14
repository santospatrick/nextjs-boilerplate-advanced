import DataTable from "@/components/DataTable";
import { useQuery } from "react-query";
import api from "@/services/api";
import { useMemo, useState } from "react";

function HomeTable() {
  const perPage = 5;
  const [page, setPage] = useState(1);
  const {
    data: users,
    isLoading,
    error,
  } = useQuery(["user", page], () =>
    api
      .get("user", {
        params: {
          page,
          perPage,
        },
      })
      .then((response) => response.data)
  );

  const columns = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Created at",
        accessor: (row: { created_at: Date }) => row.created_at,
        id: "created_at",
      },
    ],
    []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        An error has ocurred: "{(error as { message: string }).message}"
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={users.data}
      pagination={users.pagination}
      page={page}
      onChangePage={setPage}
      perPage={perPage}
    />
  );
}

export default HomeTable;
