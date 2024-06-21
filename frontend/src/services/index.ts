import { RootState, store } from "~/redux/store";
import { toastInfo, toastSuccess, toastWarn } from "~/common/func/toast";

import axios from "axios";
import { getKeyCert } from "~/common/func/optionConvert";
import { logout } from "~/redux/reducer/auth";
import { useSelector } from "react-redux";

export enum RESULT {
  SUCCESSFUL = 0,
  ERR,
  OTP_SEND_MANY = 20,
}

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
  timeout: 60000,
  timeoutErrorMessage: "Request timeout",
});

axiosClient.interceptors.request.use(async (config) => {
  const { token, user } = store.getState().auth;
  const { language } = store.getState().site;
  if (config.headers["Content-Type"] != "multipart/form-data") {
    config.data = {
      // device: "web",
      // username: user?.userName || "",
      // ...getKeyCert(),
      ...config.data,
    };
  }
  let languageName = "";
  if (language == "vi") {
    languageName = "vi-VN";
  }
  else if (language == "cn") {
    languageName = "zh-CN";
  }
  else {
    languageName = "en-US";
  }
  config.headers.Authorization = token ? "Bearer " + token : null;
  config.headers.Product = "Admin";
  config.headers["Accept-Language"] = languageName;
  return config;
});
axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: any) => {
    if (error.response && error.response.data) {
      throw error.response.data;
    }

    if (!axios.isCancel(error)) throw error;
  }
);
export default axiosClient;

export const httpRequest = async ({
  http,
  setLoading,
  msgSuccess = "Thành công",
  showMessageSuccess = false,
  showMessageFailed = false,
  isList = false,
  root = false,
  onError,
}: {
  http: any;
  setLoading?: (any: any) => void;
  onError?: () => void;
  showMessageSuccess?: boolean;
  showMessageFailed?: boolean;
  isList?: boolean;
  root?: boolean;
  msgSuccess?: string;
}) => {
  setLoading && setLoading(() => true);
  try {
    const res: any = await http;

    if (root) {
      return res;
    }
    if (res?.error?.code === RESULT.SUCCESSFUL || !res?.error?.code) {
      showMessageSuccess &&
        toastSuccess({ msg: msgSuccess || res?.error.message });
      if (isList) {
        return {
          items: res?.data?.items || [],
          total: res?.data?.pagination?.totalCount || 0,
          res: res?.data,
        };
      }

      return res || true;
    } else {
      onError && onError();
      throw res?.error.message;
    }
  } catch (err: any) {
    if (
      err?.error?.code == 401 ||
      err?.status == 401 ||
      err?.err?.response?.status == 401 ||
      err?.response?.status == 401
    ) {
      store.dispatch(logout());
      toastWarn({ msg: "Hết hạn đăng nhập" });
    } else if (typeof err == "string") {
      showMessageFailed && toastWarn({ msg: err || "Có lỗi đã xảy ra" });
    } else if (
      err?.error?.code == "ERR_NETWORK" ||
      err?.error?.code == "ECONNABORTED"
    ) {
      showMessageFailed && toastInfo({ msg: "Kiểm tra kết nối internet" });
    }
  } finally {
    setLoading && setLoading(() => false);
  }
};
