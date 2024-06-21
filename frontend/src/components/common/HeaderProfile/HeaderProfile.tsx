import { FaAngleLeft } from "react-icons/fa6";
import Link from "next/link";
import { PropsHeaderProfile } from "./interfaces";
import ROUTER from "~/constants/router";
import Search from "../Search";
import TabNavLink from "../TabNavLink";
import { memo } from "react";
import styles from "./HeaderProfile.module.scss";

function HeaderProfile({
  title,
  linkBack,
  nav,
  search,
  placeholderSearch,
  listHrefNav,
  action,
  navNoBorder,
  classTabNav,
  onClickBack,
}: PropsHeaderProfile) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {onClickBack ? (
            <div onClick={onClickBack}>
              <i>
                <FaAngleLeft />
              </i>
            </div>
          ) : (
            <Link href={linkBack || "/"}>
              <i>
                <FaAngleLeft />
              </i>
            </Link>
          )}

          <p>{title}</p>
          {action ? <div className={styles.action}>{action}</div> : null}
        </div>
      </div>
      <div className={styles.nav}>
        {nav ? (
          <TabNavLink
            classMain={classTabNav}
            navNoBorder={navNoBorder}
            query={"tab"}
            listHref={listHrefNav}
          ></TabNavLink>
        ) : null}
      </div>
      {search ? (
        <div className={styles.search}>
          <Search placeholder={placeholderSearch} />
        </div>
      ) : null}
    </div>
  );
}

export default memo(HeaderProfile);
