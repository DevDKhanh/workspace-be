import Header from "../Header";
import LayoutGrid from "../LayoutGrid";
import MenuSidebar from "../MenuSidebar";
import { PropsBaseLayout } from "./interfaces";
import RequireAuth from "~/components/protected/RequiredAuth";
import clsx from "clsx";
import { memo } from "react";
import styles from "./BaseLayout.module.scss";

function BaseLayout({ children }: PropsBaseLayout) {
  return (
    <RequireAuth>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.menu}>
          <MenuSidebar />
        </div>
        <div className={clsx(styles.main)}>
          <LayoutGrid>{children}</LayoutGrid>
        </div>
      </div>
    </RequireAuth>
  );
}

export default memo(BaseLayout);
