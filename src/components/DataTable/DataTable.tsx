import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useTable } from "react-table";

type Pagination = {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
};

type Props = {
  columns: any;
  data: any;
  pagination: Pagination;
  perPage: number;
  page: number;
  onChangePage: any;
};

function DataTable({
  columns,
  data,
  pagination,
  perPage,
  page,
  onChangePage,
}: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const totalPages = useMemo(() => {
    return Math.ceil(pagination.total / perPage);
  }, [pagination.total, perPage]);

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <Tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps();
                  return (
                    <Th key={key} {...restColumn}>
                      {column.render("Header")}
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <Tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <Td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box
        w="100%"
        height="60px"
        px="20px"
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
        borderRadius="md"
        background="gray.200"
        color="gray.600"
        fontSize="sm"
      >
        <p>
          {page} - {totalPages} of {pagination.total}
        </p>

        <Stack direction="row">
          <IconButton
            onClick={() => {
              if (page === 1) return;
              onChangePage((page: number) => Math.max(page - 1, 0));
            }}
            aria-label="Go to previous page"
            icon={<ChevronLeftIcon />}
            disabled={page === 1}
            colorScheme="brand"
            variant="outline"
          />
          <IconButton
            aria-label="Go to next page"
            onClick={() => {
              if (page === pagination.lastPage) return;
              onChangePage((page: number) => page + 1);
            }}
            icon={<ChevronRightIcon />}
            disabled={page === pagination.lastPage}
            colorScheme="brand"
            variant="outline"
          />
        </Stack>
      </Box>
    </>
  );
}

export default DataTable;
