import { useDebounce } from "usehooks-ts";
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
  CircularProgress,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { MdFilterList, MdSearch } from "react-icons/md";
import { useTable } from "react-table";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Container } from "./styles";

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
  isLoading: boolean;
  onSearchDebounced?: (search: string) => any;
  inputPlaceholder?: string;
  onClickFilter?: () => void;
};

function DataTable({
  columns,
  data = [],
  pagination = { total: 0, page: 1, perPage: 10, lastPage: 1 },
  perPage,
  page,
  onChangePage,
  isLoading,
  onSearchDebounced,
  inputPlaceholder = "",
  onClickFilter = () => null,
}: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const totalPages = useMemo(() => {
    return Math.ceil(pagination.total / perPage);
  }, [pagination.total, perPage]);

  useEffect(() => {
    setIsSearching(false);
    if (onSearchDebounced) {
      onSearchDebounced(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchDebounced]);

  return (
    <Container>
      <Box
        w="100%"
        height="60px"
        px="10px"
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
        background="gray.200"
        color="gray.600"
        fontSize="sm"
      >
        <HStack width="100%">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} fontSize="xl" />
            </InputLeftElement>
            <Input
              variant="outline"
              width="100%"
              onChange={(event) => {
                setIsSearching(true);
                setSearchTerm(event.target.value);
              }}
              value={searchTerm}
              placeholder={inputPlaceholder}
            />
            {isSearching && (
              <InputRightElement>
                <CircularProgress size={6} isIndeterminate color="brand.600" />
              </InputRightElement>
            )}
          </InputGroup>
          <IconButton
            onClick={onClickFilter}
            aria-label="Toggle filter visibility"
            icon={<MdFilterList />}
            fontSize="20px"
          />
        </HStack>
      </Box>
      <Box width="100%" overflow="auto">
        <PerfectScrollbar>
          <Table {...getTableProps()}>
            <Thead backgroundColor="#fff">
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
            {isLoading ? (
              <Tbody>
                <Tr>
                  <Td padding={0} colSpan={columns.length}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor="#fff"
                      height="364px"
                      width="100%"
                    >
                      <CircularProgress isIndeterminate color="brand.600" />
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            ) : (
              <Tbody backgroundColor="#fff" {...getTableBodyProps}>
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
            )}
          </Table>
        </PerfectScrollbar>
      </Box>
      <Box
        w="100%"
        height="60px"
        px="20px"
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
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
    </Container>
  );
}

export default DataTable;
