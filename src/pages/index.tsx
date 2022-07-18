import PrivatePage from "@/layouts/PrivatePage";
import Link from "next/link";
import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Index: NextPageWithLayout = () => {
  return (
    <div>
      <Link href="/forms">link</Link>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <PrivatePage title="Dashboard">{page}</PrivatePage>;
};

export default Index;
