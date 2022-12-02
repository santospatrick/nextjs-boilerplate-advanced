import InputText from "@/components/inputs/InputText";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import schema from "./schema";

export type FormValues = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  useAllByName: boolean;
  name: string;
  route: string;
  modelName: string;
  tableName: string;
  controller: string;
  transform: string;
  transformer: string;
  fields: any[];
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues?: Partial<FormValues>;
};

export type CrudFormRef = {
  setError: UseFormSetError<FormValues>;
};

type KeysFormValues = keyof FormValues;

type SwitchProps = {
  name: KeysFormValues;
  label: string;
};

const SWITCHES: SwitchProps[] = [
  {
    name: "create",
    label: "Create",
  },
  {
    name: "read",
    label: "Read",
  },
  {
    name: "update",
    label: "Update",
  },
  {
    name: "delete",
    label: "Delete",
  },
];

export const FIELD_TYPES = [];
const FIELD_OPTION = {
  name: "",
  type: "",
  default: "",
  required: false,
  unique: false,
  index: false,
};

const CrudForm: ForwardRefRenderFunction<CrudFormRef, Props> = (
  { onSubmit, defaultValues },
  ref
) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
    watch,
    setValue,
    register,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      create: false,
      read: false,
      update: false,
      delete: false,
      name: "",
      useAllByName: false,
      fields: [FIELD_OPTION],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const useByNameFieldIsChecked = watch("useAllByName", false);
  const nameFieldValue = watch("name");

  function firstLetterToUpperCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  useLayoutEffect(() => {
    const FIELDS_REFRESH_BY_NAME_CAPITALIZE: Partial<
      Record<KeysFormValues, string>
    > = {
      controller: "Controller",
      transform: "Transform",
      transformer: "Transformer",
    };

    const FIELDS_REFRESH_BY_NAME_LOWER_CASE: KeysFormValues[] = [
      "route",
      "tableName",
    ];

    if (useByNameFieldIsChecked) {
      Object.entries(FIELDS_REFRESH_BY_NAME_CAPITALIZE).forEach(
        ([key, value]) => {
          setValue(
            key as KeysFormValues,
            `${firstLetterToUpperCase(nameFieldValue)}${value}`
          );
        }
      );

      for (const field of FIELDS_REFRESH_BY_NAME_LOWER_CASE) {
        setValue(field, nameFieldValue.toLowerCase());
      }

      setValue("modelName", firstLetterToUpperCase(nameFieldValue));
    }
  }, [useByNameFieldIsChecked, nameFieldValue, setValue]);

  useImperativeHandle(ref, () => ({
    setError,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex
        width="100%"
        maxWidth="654px"
        justifyContent="space-between"
        paddingX={29}
        paddingY={5}
      >
        {SWITCHES.map((switchInput) => (
          <Flex gap={19} key={switchInput.name} alignItems="center">
            <Controller
              control={control}
              name={switchInput.name}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Switch
                  onBlur={onBlur}
                  onChange={onChange}
                  checked={Boolean(value)}
                  ref={ref}
                  id={`switch-${switchInput.name}`}
                />
              )}
            />
            <Text
              as="label"
              htmlFor={`switch-${switchInput.name}`}
              fontSize="sm"
            >
              {switchInput.label}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Box
        as="fieldset"
        borderBottom="2px solid"
        borderColor="sageDark.sage6"
        paddingX={29}
        paddingY={5}
      >
        <Grid
          maxWidth={810}
          columnGap={12}
          rowGap={19}
          templateColumns="repeat(2, 1fr)"
        >
          <InputText
            label="Name"
            name="name"
            placeholder="Entity name"
            control={control}
          />
          <Flex width="100%">
            <Controller
              control={control}
              name="useAllByName"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Checkbox
                  onChange={onChange}
                  onBlur={onBlur}
                  defaultChecked={value}
                  ref={ref}
                >
                  Use all by name
                </Checkbox>
              )}
            />
          </Flex>

          <InputText
            disabled={useByNameFieldIsChecked}
            label="Table"
            name="tableName"
            control={control}
          />
          <InputText
            disabled={useByNameFieldIsChecked}
            label="Controller"
            name="controller"
            control={control}
          />

          <InputText
            disabled={useByNameFieldIsChecked}
            label="Transform"
            name="transform"
            control={control}
          />
          <InputText
            disabled={useByNameFieldIsChecked}
            label="Transformer"
            name="transformer"
            control={control}
          />

          <InputText
            disabled={useByNameFieldIsChecked}
            label="Route"
            name="route"
            control={control}
          />
          <InputText
            disabled={useByNameFieldIsChecked}
            label="Model"
            name="modelName"
            control={control}
          />
        </Grid>
      </Box>

      <Box paddingX={29} paddingY={5}>
        <Text variant="heading" color="white" fontSize="md">
          Fields
        </Text>

        <Flex marginTop={4} gap={2} flexDirection="column">
          {fields.map((field, index) => (
            <Flex gap={12} key={field.id}>
              <Flex gap={3}>
                <Input
                  placeholder="Name"
                  size="sm"
                  {...register(`fields.${index}.name`)}
                />
                <Select
                  placeholder="Type"
                  size="sm"
                  {...register(`fields.${index}.type`)}
                />
                <Input
                  placeholder="Default value"
                  size="sm"
                  {...register(`fields.${index}.default`)}
                />

                <Box display="flex" gap={3}>
                  <Flex width="100%">
                    <Controller
                      control={control}
                      name={`fields.${index}.required`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Checkbox
                          onChange={onChange}
                          onBlur={onBlur}
                          defaultChecked={value}
                          ref={ref}
                          size="sm"
                        >
                          Required
                        </Checkbox>
                      )}
                    />
                  </Flex>
                  <Flex width="100%">
                    <Controller
                      control={control}
                      name={`fields.${index}.unique`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Checkbox
                          onChange={onChange}
                          onBlur={onBlur}
                          defaultChecked={value}
                          ref={ref}
                          size="sm"
                        >
                          Unique
                        </Checkbox>
                      )}
                    />
                  </Flex>
                  <Flex width="100%">
                    <Controller
                      control={control}
                      name={`fields.${index}.nullable`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Checkbox
                          onChange={onChange}
                          onBlur={onBlur}
                          defaultChecked={value}
                          ref={ref}
                          size="sm"
                        >
                          Nullable
                        </Checkbox>
                      )}
                    />
                  </Flex>
                </Box>
              </Flex>

              <HStack>
                <IconButton
                  size="sm"
                  aria-label="Add new field"
                  variant="ghost"
                  onClick={() => append(FIELD_OPTION)}
                  icon={<AddIcon />}
                />

                <IconButton
                  size="sm"
                  aria-label="Remove this field"
                  variant="ghost"
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  color="redDark.red9"
                  icon={<DeleteIcon />}
                />
              </HStack>
            </Flex>
          ))}
        </Flex>
      </Box>

      <Flex
        as="footer"
        alignItems="center"
        justifyContent="space-between"
        paddingX={29}
        paddingY={5}
        borderTop="2px solid"
        borderColor="sageDark.sage6"
      >
        <Button variant="ghost">Seeds</Button>
        <Button isLoading={isSubmitting} type="submit">
          Generate!
        </Button>
      </Flex>
    </form>
  );
};

export default forwardRef(CrudForm);
