import { Fragment } from "react";
import Head from "next/head";
import MainLogin from "~/components/pages/auth/MainLogin";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <MainLogin />
    </Fragment>
  );
}
