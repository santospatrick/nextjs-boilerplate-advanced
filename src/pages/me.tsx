import { GetServerSideProps } from "next";
import ProfileForm from "@/components/forms/ProfileForm";
import {
  FormValues,
  ProfileFormRefType,
} from "@/components/forms/ProfileForm/ProfileForm";
import PrivatePage from "@/layouts/PrivatePage";
import { Container } from "@chakra-ui/react";
import React, { ReactElement, useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { NextPageWithLayout } from "./_app";
import api, { getAPIClient, httpErrorHandler } from "@/services/api";
import { removeEmptyValues } from "@/utils/parse";
import omit from "lodash.omit";
import { toast } from "react-toastify";

const Me: NextPageWithLayout = ({ data }) => {
  const formRef = useRef<ProfileFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    removeEmptyValues(values);
    const apiValues = omit(values, ["id", "created_at", "confirmPassword"]);
    try {
      await api.put(`/user/${values.id}`, apiValues);
    } catch (error) {
      httpErrorHandler(error, formRef.current?.setError);
    }
    toast.success("Data edited successfully!");
    formRef.current?.setValue("password", "");
    formRef.current?.setValue("confirmPassword", "");
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <Container maxW="1400px" m="auto" py={10}>
      <ProfileForm onSubmit={onSubmit} defaultValues={data} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const api = getAPIClient(ctx);
  const { data } = await api.get("auth/me");

  return {
    props: {
      data,
    },
  };
};

Me.getLayout = (app: ReactElement) => {
  return <PrivatePage>{app}</PrivatePage>;
};

export default Me;
