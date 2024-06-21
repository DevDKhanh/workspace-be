import { Fragment, ReactElement, useEffect } from "react";

import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import backgrounds from "~/constants/background";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>Báo cáo công việc</title>
      </Head>
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
