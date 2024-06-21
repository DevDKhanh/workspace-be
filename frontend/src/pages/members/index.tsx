import { Fragment, ReactElement } from "react";

import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import MainMembers from "~/components/pages/members/MainMembers";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>Thành viên</title>
      </Head>
      <MainMembers />
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
