import { RootState } from "~/redux/store";
import i18n from "~/locale/i18n";
import { useQueryNextJS } from "~/common/hooks/useQueryParams";
import { useSelector } from "react-redux";

function useCheckLogin() {
  const { setQuery } = useQueryNextJS();
  const { isLogin } = useSelector((state: RootState) => state.auth);

  const checkLogin = ({ development, callBack }: { development?: boolean, callBack?: () => void }) => {
    if (development) {
      alert(i18n.t("common.tinh_nang_dang_duoc_phat_trien"));
      return;
    }

    if (!isLogin) {
      setQuery({
        formAuth: "popup",
      });
      return;
    }

    callBack && callBack()
  };

  return {
    check: checkLogin,
  };
}

export default useCheckLogin;
