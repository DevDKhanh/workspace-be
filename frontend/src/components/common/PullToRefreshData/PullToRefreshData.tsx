import { FaLongArrowAltDown } from "react-icons/fa";
import { PropsPullToRefreshData } from "./interfaces";
import PullToRefresh from "react-simple-pull-to-refresh";
import i18n from "~/locale/i18n";
import { memo } from "react";
import styles from "./PullToRefreshData.module.scss";

function PullToRefreshData({ onRefresh, children }: PropsPullToRefreshData) {
  return (
    <PullToRefresh
      onRefresh={async () => {
        onRefresh();
      }}
      pullingContent={
        <div className={styles.note}>
          <span className={styles.text}>
            <FaLongArrowAltDown /> {i18n.t("common.keo_xuong_de_lam_moi")} <FaLongArrowAltDown />
          </span>
        </div>
      }
      pullDownThreshold={90}
    >
      <>{children}</>
    </PullToRefresh>
  );
}

export default memo(PullToRefreshData);
