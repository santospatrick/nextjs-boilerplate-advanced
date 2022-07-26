import PrivatePage from "@/layouts/PrivatePage";
import { Container } from "@chakra-ui/react";
import React, { ReactElement, useRef } from "react";
import { NextPageWithLayout } from "../_app";
import api, { httpErrorHandler } from "@/services/api";
import { UserData } from "@/typings/user";
import UserForm from "@/components/forms/UserForm";
import { SubmitHandler } from "react-hook-form";
import { FormValues } from "@/components/forms/UserForm";
import { useRouter } from "next/router";
import omit from "lodash.omit";
import { UserFormRefType } from "@/components/forms/UserForm/UserForm";
import { toast } from "react-toastify";

type Props = {
  data: UserData;
};

type AxiosResponseData = {
  newUser: UserData;
};

const UserId: NextPageWithLayout<Props> = ({ data }) => {
  const router = useRouter();
  const formRef = useRef<UserFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const apiValues = omit(values, ["confirmPassword", "id", "created_at"]);
    try {
      const { data } = await api.post<AxiosResponseData>("users", apiValues);
      toast.success("User created succesfully!");
      router.push(`/users/${data.newUser.id}`);
    } catch (error) {
      httpErrorHandler(error, formRef.current?.setError);
    }
  };

  return (
    <Container maxW="1400px" m="auto" py={10}>
      <UserForm ref={formRef} onSubmit={onSubmit} defaultValues={data} />
    </Container>
  );
};

UserId.getLayout = (page: ReactElement) => {
  return <PrivatePage>{page}</PrivatePage>;
};

export default UserId;
