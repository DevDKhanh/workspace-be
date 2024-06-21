import { Category, Layer, Paintbucket, Timer1 } from "iconsax-react";

import ActionsTable from "~/components/common/ActionsTable";
import FormCreate from "../FormCreate";
import { PropsMainTeam } from "./interfaces";
import Table from "~/components/common/Table";
import TitleHeader from "~/components/common/TitleHeader";
import { memo } from "react";
import styles from "./MainTeam.module.scss";

function MainTeam({}: PropsMainTeam) {
  return (
    <div className="effectShow">
      <TitleHeader title="Quản lí đội nhóm" />
      <FormCreate />
      <Table
        data={new Array(10).fill(0)}
        column={[
          {
            title: (
              <span className="th">
                <Paintbucket size={16} /> Màu sắc
              </span>
            ),
            render: () => <div className={styles.projectName}>Tên dự án</div>,
          },
          {
            title: (
              <span className="th">
                <Layer size={16} /> Tên đội
              </span>
            ),
            render: () => <div className={styles.projectName}>Tên dự án</div>,
          },
          {
            title: (
              <span className="th">
                <Layer size={16} /> Leader
              </span>
            ),
            render: () => <div className={styles.projectName}>Tên dự án</div>,
          },
          {
            title: (
              <p className="th">
                <Timer1 size={16} /> Ngày tạo
              </p>
            ),
            render: () => <div className={styles.projectName}>Tên dự án</div>,
          },
          {
            title: (
              <p className="th">
                <Category size={16} /> Hành động
              </p>
            ),
            render: () => <ActionsTable id={1} />,
          },
        ]}
      />
    </div>
  );
}

export default memo(MainTeam);
