import InputText from "@/components/inputs/InputText";
import { Button, HStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import {
  SubmitHandler,
  useForm,
  UseFormReset,
  UseFormSetError,
} from "react-hook-form";
import schema from "./schema";

export type FormValues = {
  email: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues?: Partial<FormValues>;
  onClearFilters: () => void;
  isClearingFilters?: boolean;
};

export type UsersFilterFormRef = {
  setError: UseFormSetError<FormValues>;
  reset: UseFormReset<FormValues>;
};

const UsersFilterForm: ForwardRefRenderFunction<UsersFilterFormRef, Props> = (
  { onSubmit, defaultValues, onClearFilters },
  ref
) => {
  const computedDefaultValues = {
    email: "",
    ...defaultValues,
  };
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: computedDefaultValues,
  });

  useImperativeHandle(ref, () => ({
    setError,
    reset,
  }));

  const isClearFiltersDisabled = !Object.keys(defaultValues || {}).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputText label="Email" type="email" name="email" control={control} />
      <HStack mt={8}>
        <Button
          ml="auto"
          isDisabled={isClearFiltersDisabled}
          onClick={onClearFilters}
        >
          Clear filters
        </Button>
        <Button
          colorScheme="brand"
          isLoading={isSubmitting}
          isDisabled={!isDirty}
          type="submit"
        >
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default forwardRef(UsersFilterForm);
