import { Fragment, ReactElement } from "react";

import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import MainTeam from "~/components/pages/team/MainTeam";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>Dự án</title>
      </Head>
      <MainTeam />
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
