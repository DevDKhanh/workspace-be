import Image from "next/image";
import ImageCustom from "../ImageCustom";
import { PropsEmptyMessage } from "./interfaces";
import i18n from "~/locale/i18n";
import styles from "./EmptyMessage.module.scss";

function EmptyMessage({ }: PropsEmptyMessage) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.wrapper}>
        <div className={styles.img}>
          <ImageCustom src={"/empty.png"} alt="slots game" />
        </div>
      </div> */}
      <span>{i18n.t("common.muc_nay_chua_co_du_lieu")}</span>
    </div>
  );
}

export default EmptyMessage;
