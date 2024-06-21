import { memo, useMemo } from "react";

import { FaCheck } from "react-icons/fa6";
import ImageCustom from "../../ImageCustom";
import LayoutGrid from "~/components/layout/LayoutGrid";
import { PropsListHeadPhone } from "./interfaces";
import { RiCloseFill } from "react-icons/ri";
import { RootState } from "~/redux/store";
import Search from "~/components/common/Search";
import styles from "./ListHeadPhone.module.scss";
import { useQueryNextJS } from "~/common/hooks/useQueryParams";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function ListHeadPhone({
  onClose,
  query = "phone",
  isDefault = true,
  onSetValue,
  codeActive,
}: PropsListHeadPhone) {
  const { listHeadPhone } = useSelector((state: RootState) => state.site);
  const { setQuery } = useQueryNextJS();
  const router = useRouter();
  const { [query]: codeQuery } = router.query;

  const phoneActive = useMemo(() => {
    return listHeadPhone?.find((x: any) => {
      if (codeActive) {
        return isDefault && !codeActive ? x.code == "VN" : x.code == codeActive;
      } else {
        return isDefault && !codeQuery ? x.code == "VN" : x.code == codeQuery;
      }
    });
  }, [listHeadPhone, codeActive, isDefault, codeQuery]);

  return (
    <div className={styles.container}>
      <LayoutGrid>
        <div className={styles.head}>
          <span>Chọn quốc tịch</span>
          <i onClick={onClose}>
            <RiCloseFill />
          </i>
        </div>
        <Search placeholder="Nhập tên quốc gia" keyName="phoneName" />
        <div className={styles.list}>
          {listHeadPhone?.map((phone: any, i: number) => (
            <div
              className={styles.item}
              key={phone.code}
              onClick={() => {
                onClose();
                if (!onSetValue)
                  setQuery({
                    [query]: phone.code
                  });
                else {
                  onSetValue(phone);
                }
              }}
            >
              <div className={styles.wrapper}>
                <div className={styles.img}>
                  <ImageCustom src={phone.flag} alt={phone.name} />
                </div>
              </div>
              <div>{phone.name}</div>
              <span>{phone.phoneNumberHeader}</span>
              {phoneActive?.code == phone.code ? (
                <i>
                  <FaCheck />
                </i>
              ) : null}
            </div>
          ))}
        </div>
      </LayoutGrid>
    </div>
  );
}

export default memo(ListHeadPhone);
