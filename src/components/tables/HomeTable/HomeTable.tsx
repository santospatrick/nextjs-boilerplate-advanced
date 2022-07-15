import DataTable from "@/components/DataTable";
import { useQuery, useQueryClient } from "react-query";
import api from "@/services/api";
import { useMemo, useState } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { MdCheck, MdEdit } from "react-icons/md";
import { UserResponse } from "@/typings/user";
import { toast } from "react-toastify";

function HomeTable() {
  const perPage = 5;
  const [page, setPage] = useState(1);
  const [currentCell, setCurrentCell] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const queryClient = useQueryClient();

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
          order: "created_at",
        },
      })
      .then((response) => response.data)
  );

  const columns = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
        Cell: (data: any) => {
          if (currentCell === data.cell.row.original.id) {
            return (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  api
                    .put(`user/${currentCell}`, {
                      username: currentText,
                    })
                    .catch(() => {
                      toast.error("Couldn't edit user, try again later");
                    });
                  queryClient.setQueryData(
                    ["user", page],
                    (old: Partial<UserResponse> | undefined) => {
                      return {
                        ...old,
                        data: old?.data?.map((data) =>
                          data.id === currentCell
                            ? { ...data, username: currentText }
                            : data
                        ),
                      };
                    }
                  );
                  setCurrentCell(null);
                  setCurrentText("");
                }}
              >
                <InputGroup size="md">
                  <Input
                    autoFocus
                    onChange={(event) => setCurrentText(event.target.value)}
                    value={currentText}
                  />
                  <InputRightElement>
                    <IconButton
                      type="submit"
                      aria-label="Submit changes"
                      icon={<MdCheck />}
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
              </form>
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
    ],
    [currentCell, currentText, page, queryClient]
  );

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
    />
  );
}

export default HomeTable;
