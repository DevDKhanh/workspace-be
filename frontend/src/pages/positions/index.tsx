import { Fragment, ReactElement } from "react";

import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import MainPositions from "~/components/pages/positions/MainPositions";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>Vị trí</title>
      </Head>
      <MainPositions />
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
