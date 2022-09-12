import DataTable from "@/components/DataTable";

import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "@/services/api";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";

export type ColumnsProps = {
  currentCell: any;
  currentText: string;
  setCurrentCell: Dispatch<SetStateAction<null>>;
  setCurrentText: Dispatch<SetStateAction<string>>;
  onClickDelete: (id: string) => void;
  page: number;
  searchTerm: string;
  appliedFilters: any;
};

type Props = {
  endpoint: string;
  columns: (args: ColumnsProps) => void;
  appliedFilters: any;
  onClickFilter: () => void;
};

const StandardTable = ({
  endpoint,
  columns,
  appliedFilters,
  onClickFilter,
}: Props) => {
  const perPage = 5;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCell, setCurrentCell] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: isLoadingDeletion } = useMutation(() =>
    api.delete(`/${endpoint}/${idToDelete}`)
  );

  const { data, isLoading, error } = useQuery(
    [endpoint, page, searchTerm, appliedFilters],
    () =>
      api
        .get(endpoint, {
          params: {
            q: searchTerm,
            page,
            perPage,
            order: "created_at",
            ...appliedFilters,
          },
        })
        .then((response) => response.data)
  );

  const onSearchDebounced = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, []);

  const onConfirmDeletion = async () => {
    try {
      await mutateAsync();
      queryClient.invalidateQueries([endpoint, page, searchTerm]);
      setIdToDelete(null);
      toast.success("Item inativado com sucesso!");
    } catch (error: any) {
      toast.error(error.response?.data.message);
    }
  };

  if (error) {
    return <div>Houve um erro: "{(error as { message: string }).message}"</div>;
  }

  return (
    <>
      <ConfirmDialog
        isOpen={!!idToDelete}
        onConfirm={onConfirmDeletion}
        onClose={() => setIdToDelete(null)}
        isLoading={isLoadingDeletion}
      />
      <DataTable
        columns={columns({
          currentCell,
          currentText,
          onClickDelete: (id) => {
            setIdToDelete(id);
          },
          setCurrentCell,
          setCurrentText,
          page,
          searchTerm,
          appliedFilters,
        })}
        data={data?.data}
        pagination={data?.pagination}
        page={page}
        onChangePage={setPage}
        perPage={perPage}
        isLoading={isLoading}
        onSearchDebounced={onSearchDebounced}
        inputPlaceholder="Procure por nome..."
        onClickFilter={onClickFilter}
      />
    </>
  );
};

export default StandardTable;
