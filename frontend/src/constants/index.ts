import {
  Bill,
  Briefcase,
  Layer,
  People,
  Setting3,
  UserOctagon,
} from "iconsax-react";

import ROUTER from "./router";

export const MENU = [
  {
    title: "Công việc",
    group: [
      {
        title: "Dự án",
        path: ROUTER.PROJECTS,
        icon: Layer,
      },
      {
        title: "Công việc",
        path: ROUTER.WORKS,
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Nhân sự",
    group: [
      {
        title: "Quản lí team",
        path: ROUTER.TEAM,
        icon: People,
      },
      {
        title: "Thành viên",
        path: ROUTER.MEMBERS,
        icon: UserOctagon,
      },
    ],
  },
  {
    title: "Cấu hình",
    group: [
      {
        title: "Chức vụ",
        path: ROUTER.POSITIONS,
        icon: Bill,
      },
      {
        title: "Thao tác với dự án",
        path: ROUTER.PROJECT_ACTIONS,
        icon: Setting3,
      },
    ],
  },
];
