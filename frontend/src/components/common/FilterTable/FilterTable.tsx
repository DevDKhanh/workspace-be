//"use client";

import DateRangerCustom from "../DateRangerCustom";
import { PropsFilterTable } from "./interfaces";
import React from "react";
import Search from "../Search";
import styles from "./FilterTable.module.scss";

function FilterTable({
  children,
  placeholderInputSearch = "Nhập từ khóa tìm kiếm",
  placeholderTime = "Thời gian",
  isTime = true,
  isSearch = true,
  funcAddNew,
  funcExportExcel,
  keyTypeDate = "typeDate",
  keydateFrom = "dateFrom",
  keyDateTo = "dateTo",
}: PropsFilterTable) {
  return (
    <div className={styles.main}>
      <div className={styles.search}>
        {isTime ? (
          <div className={styles.dateRanger}>
            <DateRangerCustom
              titleTime={placeholderTime}
              keyTypeDate={keyTypeDate}
              keydateFrom={keydateFrom}
              keyDateTo={keyDateTo}
            />
          </div>
        ) : null}
        {children ? <div className={styles.children}>{children}</div> : null}
        {isSearch ? (
          <div className={styles.input_search}>
            <Search placeholder={placeholderInputSearch} />
          </div>
        ) : null}
      </div>
      <div className={styles.btn}></div>
    </div>
  );
}

export default FilterTable;
