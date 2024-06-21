import { Edit2, Eye, Trash } from "iconsax-react";

import { PropsActionsTable } from "./interfaces";
import { memo } from "react";
import styles from "./ActionsTable.module.scss";
import { useQueryNextJS } from "~/common/hooks/useQueryParams";

function ActionsTable({ id }: PropsActionsTable) {
  const { setQuery } = useQueryNextJS();
  return (
    <div className={styles.container}>
      <div
        className={styles.item}
        onClick={() => {
          setQuery({ view: `${id}`, edit: null, del: null });
        }}
      >
        <Eye size={20} />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          setQuery({ edit: `${id}`, view: null, del: null });
        }}
      >
        <Edit2 size={20} />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          setQuery({ del: `${id}`, view: null, edit: null });
        }}
      >
        <Trash size={20} />
      </div>
    </div>
  );
}

export default memo(ActionsTable);
