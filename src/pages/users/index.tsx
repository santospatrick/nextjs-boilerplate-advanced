import React, { ReactElement, useState } from "react";

import PrivatePage from "@/layouts/PrivatePage";
import { Container, HStack, IconButton, useBoolean } from "@chakra-ui/react";
import { NextPageWithLayout } from "../_app";
import StandardTable, {
  ColumnsProps,
} from "@/components/StandardTable/StandardTable";
import { format, parseISO } from "date-fns";
import api from "@/services/api";
import { toast } from "react-toastify";
import Link from "next/link";
import { MdArrowRightAlt, MdDelete } from "react-icons/md";
import InlineEdit from "@/components/InlineEdit";
import NameForm from "@/components/forms/NameForm";
import { useQueryClient } from "react-query";
import { UserResponse } from "@/typings/user";
import ModalFullscreen from "@/components/ModalFullscreen";
import UsersFilterForm from "@/components/forms/UsersFilterForm";
import { SubmitHandler } from "react-hook-form";
import { FormValues } from "@/components/forms/UsersFilterForm/UsersFilterForm";

const Users: NextPageWithLayout = () => {
  const queryClient = useQueryClient();

  const [isFilterOpen, { on, off }] = useBoolean();
  const [appliedFilters, setAppliedFilters] = useState({});

  const getColumns = (columnProps: ColumnsProps) => [
    {
      Header: "Name",
      accessor: "name",
      Cell: (data: any) => (
        <InlineEdit
          isEditing={columnProps.currentCell === data.cell.row.original.id}
          onClickEdit={() => {
            columnProps.setCurrentCell(data.cell.row.original.id);
            columnProps.setCurrentText(data.value);
          }}
          value={data.value}
          FormComponent={
            <NameForm
              onSubmit={(values) => {
                api
                  .put(`users/${columnProps.currentCell}`, {
                    name: values.name,
                  })
                  .catch(() => {
                    toast.error("Couldn't edit user, try again later");
                  });
                queryClient.setQueryData(
                  [
                    "user",
                    columnProps.page,
                    columnProps.searchTerm,
                    columnProps.appliedFilters,
                  ],
                  (old: Partial<UserResponse> | undefined) => {
                    return {
                      ...old,
                      data: old?.data?.map((data) =>
                        data.id === columnProps.currentCell
                          ? { ...data, name: values.name }
                          : data
                      ),
                    };
                  }
                );
                columnProps.setCurrentCell(null);
                columnProps.setCurrentText("");
              }}
              defaultValues={{ name: columnProps.currentText }}
              onEscapeKeypress={() => {
                columnProps.setCurrentCell(null);
                columnProps.setCurrentText("");
              }}
            />
          }
        />
      ),
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Created at",
      accessor: (row: { createdAt: string }) =>
        format(parseISO(row.createdAt), "Pp"),
      id: "createdAt",
    },
    {
      Header: "Actions",
      Cell: (data: any) => (
        <HStack>
          <Link href={`/users/${data.cell.row.original.id}`} passHref>
            <IconButton
              aria-label={"Edit user"}
              icon={<MdArrowRightAlt size={22} />}
            />
          </Link>
          <IconButton
            aria-label={"Edit user"}
            onClick={() => {
              columnProps.onClickDelete(data.cell.row.original.id);
            }}
            icon={<MdDelete size={22} />}
          />
        </HStack>
      ),
    },
  ];

  const onSubmitFilters: SubmitHandler<FormValues> = (values) => {
    setAppliedFilters(values);
    off();
  };

  const onClearFilters = () => {
    setAppliedFilters({});
    off();
  };

  return (
    <Container maxWidth="1400px" m="auto" py={10}>
      <ModalFullscreen title="Filters" isOpen={isFilterOpen} onClose={off}>
        <UsersFilterForm
          onClearFilters={onClearFilters}
          onSubmit={onSubmitFilters}
          defaultValues={appliedFilters}
        />
      </ModalFullscreen>

      <StandardTable
        appliedFilters={appliedFilters}
        onClickFilter={on}
        endpoint="users"
        columns={getColumns}
      />
    </Container>
  );
};

Users.getLayout = function getLayout(page: ReactElement) {
  return <PrivatePage title="Users">{page}</PrivatePage>;
};

export default Users;
