import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Fragment, memo, useMemo } from "react";

import Popup from "../Popup";
import { PropsSelectPositionBottom } from "./interfaces";
import clsx from "clsx";
import i18n from "~/locale/i18n";
import styles from "./SelectPositionBottom.module.scss";
import { useQueryNextJS } from "~/common/hooks/useQueryParams";
import { useRouter } from "next/router";

function SelectPositionBottom({
  title,
  form,
  setForm,
  name,
  listData,
  placeholder = i18n.t("deposit.Vui lòng chọn"),
  children,
  onClick,
}: PropsSelectPositionBottom) {
  const router = useRouter();
  const { setQuery } = useQueryNextJS();
  const { [name]: open } = router.query;

  const itemActive = useMemo(
    () => listData?.find((x) => x.code == form?.[name]),
    [form, listData, name]
  );

  return (
    <Fragment>
      {children ? (
        <div
          onClick={() => {
            setQuery({ [name]: "true" });
          }}
        >
          {children}
        </div>
      ) : (
        <div className={styles.group}>
          <label className={styles.label}>{title}</label>
          <div
            className={styles.groupBox}
            onClick={() => {
              setQuery({ [name]: "true" });
            }}
          >
            <div className={styles.input}>
              {itemActive?.name || placeholder}
            </div>
            <div className={styles.select}>
              {!open ? <FaAngleRight /> : <FaAngleDown />}
            </div>
          </div>
        </div>
      )}
      <Popup
        open={!!open}
        classMain={clsx(styles.customPopup, { [styles.hidden]: !open })}
        onClose={() => {
          setQuery({ [name]: null });
        }}
      >
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={clsx(styles.group_box, styles.title)}>
              <p>{title || "title"}</p>
            </div>
            <div className={styles.box}>
              {listData?.map((item) => {
                return item?.isBlock ? null : (
                  <div
                    className={clsx(styles.group_box, {
                      [styles.active]: itemActive?.code == item.code,
                    })}
                    key={item.code}
                    onClick={() => {
                      setQuery({ [name]: null });
                      if (onClick) {
                        onClick(item);
                      }
                      if (setForm)
                        setForm((prev: any) => ({
                          ...prev,
                          [name]: item.code,
                          addressWallet: item.address
                        }));
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={styles.button_close}
            onClick={() => {
              setQuery({ [name]: null });
            }}
          >
            {i18n.t("deposit.Đóng")}
          </div>
        </div>
      </Popup>
    </Fragment>
  );
}
export default memo(SelectPositionBottom);
