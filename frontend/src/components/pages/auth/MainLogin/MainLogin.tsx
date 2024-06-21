import { memo, useState } from "react";

import Button from "~/components/common/Button";
import Form from "~/components/common/Form";
import Input from "~/components/common/Form/Input";
import Loading from "~/components/common/Loading";
import { PropsMainLogin } from "./interfaces";
import RequiredLogout from "~/components/protected/RequiredLogout";
import authService from "~/services/authService";
import { httpRequest } from "~/services";
import { login } from "~/redux/reducer/auth";
import { setUser } from "~/redux/reducer/user";
import { store } from "~/redux/store";
import styles from "./MainLogin.module.scss";
import { useMutation } from "@tanstack/react-query";

function MainLogin({}: PropsMainLogin) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const loginRequest = useMutation({
    mutationFn: () =>
      httpRequest({
        http: authService.login(form),
      }),
    onSuccess(data) {
      store.dispatch(login({ token: data.access_token }));
      store.dispatch(setUser(data));
    },
  });

  const handleSubmit = () => {
    loginRequest.mutate();
  };

  return (
    <RequiredLogout>
      <div className={styles.container}>
        <Loading loading={loginRequest.isPending} />
        <div className={styles.form}>
          <h1>Đăng nhập hệ thống</h1>
          <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
            <Input isRequire name="username" placeholder="Tên đăng nhập" />
            <Input
              isRequire
              name="password"
              placeholder="Mật khẩu"
              type="password"
            />
            <div className={styles.groupBtn}>
              <Button primary rounded_6 bold>
                Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </RequiredLogout>
  );
}

export default memo(MainLogin);
