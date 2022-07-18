import DataTable from "@/components/DataTable";
import { useQuery, useQueryClient } from "react-query";
import api from "@/services/api";
import { useCallback, useMemo, useState } from "react";
import { IconButton, Stack } from "@chakra-ui/react";
import { MdArrowRightAlt, MdEdit } from "react-icons/md";
import { UserResponse } from "@/typings/user";
import { toast } from "react-toastify";
import Link from "next/link";
import UsernameForm from "@/components/forms/UsernameForm";

function HomeTable() {
  const perPage = 5;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCell, setCurrentCell] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery(["user", page, searchTerm], () =>
    api
      .get("user", {
        params: {
          q: searchTerm,
          page,
          perPage,
          order: "created_at",
        },
      })
      .then((response) => response.data)
  );

  const onEscapeKeypress = useCallback(() => {
    setCurrentCell(null);
    setCurrentText("");
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
        Cell: (data: any) => {
          if (currentCell === data.cell.row.original.id) {
            return (
              <UsernameForm
                onSubmit={(values) => {
                  api
                    .put(`user/${currentCell}`, {
                      username: values.username,
                    })
                    .catch(() => {
                      toast.error("Couldn't edit user, try again later");
                    });
                  queryClient.setQueryData(
                    ["user", page, searchTerm],
                    (old: Partial<UserResponse> | undefined) => {
                      return {
                        ...old,
                        data: old?.data?.map((data) =>
                          data.id === currentCell
                            ? { ...data, username: values.username }
                            : data
                        ),
                      };
                    }
                  );
                  setCurrentCell(null);
                  setCurrentText("");
                }}
                defaultValues={{ username: currentText }}
                onEscapeKeypress={onEscapeKeypress}
              />
            );
          }
          return (
            <Stack alignItems="center" direction="row">
              <p>{data.value}</p>
              <IconButton
                onClick={() => {
                  setCurrentCell(data.cell.row.original.id);
                  setCurrentText(data.value);
                }}
                variant="outline"
                aria-label="Edit table cell"
                icon={<MdEdit />}
                size="sm"
              />
            </Stack>
          );
        },
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
      {
        Header: "Actions",
        Cell: (data: any) => (
          <Link href={`/users/${data.cell.row.original.id}`} passHref>
            <IconButton
              aria-label={"Edit user"}
              icon={<MdArrowRightAlt size={22} />}
            />
          </Link>
        ),
      },
    ],
    [currentCell, currentText, onEscapeKeypress, page, queryClient, searchTerm]
  );

  const onSearchDebounced = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, []);

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
      data={users?.data}
      pagination={users?.pagination}
      page={page}
      onChangePage={setPage}
      perPage={perPage}
      isLoading={isLoading}
      onSearchDebounced={onSearchDebounced}
      inputPlaceholder="Search by username, email..."
    />
  );
}

export default HomeTable;
