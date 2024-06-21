import Button from "~/components/common/Button";
import Link from "next/link";
import { MENU } from "~/constants";
import { PropsMenuSidebar } from "./interfaces";
import ROUTER from "~/constants/router";
import clsx from "clsx";
import { memo } from "react";
import styles from "./MenuSidebar.module.scss";
import { useRouter } from "next/router";

function MenuSidebar({}: PropsMenuSidebar) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <Button primary rounded_8 href={ROUTER.HOME}>
          Báo cáo công việc
        </Button>
      </div>
      <div>
        <ul className={styles.menu}>
          {MENU.map((item, index) => (
            <li key={index} className={styles.groupMenu}>
              <h5>{item.title}</h5>
              <ul>
                {item.group.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className={clsx(styles.item, {
                        [styles.active]: router.pathname == item.path,
                      })}
                    >
                      <span className={styles.icon}>
                        <i>
                          <item.icon size="20" />
                        </i>
                      </span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(MenuSidebar);
