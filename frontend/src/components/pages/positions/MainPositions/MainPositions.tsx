import { Category, Layer, Timer1 } from "iconsax-react";

import ActionsTable from "~/components/common/ActionsTable";
import FormCreate from "../FormCreate";
import FormEdit from "../FormEdit";
import Moment from "react-moment";
import Pagination from "~/components/common/Pagination";
import { PropsMainPositions } from "./interfaces";
import { QUERY_KEY } from "~/constants/enum";
import Table from "~/components/common/Table";
import TitleHeader from "~/components/common/TitleHeader";
import { httpRequest } from "~/services";
import { memo } from "react";
import positionsService from "~/services/positionsService";
import styles from "./MainPositions.module.scss";
import { useQuery } from "@tanstack/react-query";
import useQueryParams from "~/common/hooks/useQueryParams";

function MainPositions({}: PropsMainPositions) {
  const { page, pageSize, keyword } = useQueryParams();

  const positions = useQuery({
    queryKey: [QUERY_KEY.positions, keyword, page, pageSize],
    queryFn: () =>
      httpRequest({
        http: positionsService.findAll({
          keyword: keyword || "",
          page: page,
          pageSize: pageSize,
        }),
      }),
  });

  return (
    <div className="effectShow">
      <TitleHeader title="Quản lí chức vụ" />
      <FormCreate />
      <FormEdit />
      <Table
        data={positions?.data?.list || []}
        column={[
          {
            title: (
              <span className="th">
                <Layer size={16} /> Tên chức vụ
              </span>
            ),
            render: (data: any) => data?.name,
          },
          {
            title: (
              <span className="th">
                <Layer size={16} /> Mô tả
              </span>
            ),
            render: (data: any) => data?.description || "--",
          },
          {
            title: (
              <p className="th">
                <Timer1 size={16} /> Thời gian tạo
              </p>
            ),
            render: (data: any) => (
              <Moment date={data?.createdAt} format="HH:mm DD/MM/YYYY" />
            ),
          },
          {
            title: (
              <p className="th">
                <Category size={16} /> Hành động
              </p>
            ),
            render: (data: any) => <ActionsTable id={data?.id} />,
          },
        ]}
      />
      <Pagination
        total={positions?.data?.total}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
}

export default memo(MainPositions);
