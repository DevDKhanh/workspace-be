import { Category, Flash, Layer, Status, Timer1, User } from "iconsax-react";
import { Fragment, memo } from "react";

import ActionsTable from "~/components/common/ActionsTable";
import FormCreate from "../FormCreate";
import { PropsMainProjects } from "./interfaces";
import Table from "~/components/common/Table";
import TitleHeader from "~/components/common/TitleHeader";
import styles from "./MainProjects.module.scss";

function MainProjects({}: PropsMainProjects) {
  return (
    <div className="effectShow">
      <TitleHeader title="Quản lí dự án" />
      <FormCreate />
      <Table
        data={new Array(10).fill(0)}
        column={[
          {
            title: (
              <span className="th">
                <Layer size={16} /> Tên dự án
              </span>
            ),
            render: () => <div className={styles.projectName}>Tên dự án</div>,
          },
          {
            title: (
              <p className="th">
                <User size={16} /> Người tạo
              </p>
            ),
            render: () => <div className={styles.projectName}>Tên dự án</div>,
          },
          {
            title: (
              <p className="th">
                <Status size={16} /> Trạng thái
              </p>
            ),
            render: () => <div className={styles.projectName}>Tên dự án</div>,
          },
          {
            title: (
              <p className="th">
                <Flash size={16} /> Tiến độ
              </p>
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

export default memo(MainProjects);
