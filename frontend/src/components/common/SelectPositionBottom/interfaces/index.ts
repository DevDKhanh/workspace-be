import React from "react";

export interface PropsSelectPositionBottom {
  form?: any;
  setForm?: (any: any) => void;
  name: string;
  listData: {
    name: string;
    code: string;
    isBlock?: boolean;
    address?: string;
  }[];
  title?: string;
  placeholder?: string;
  children?: React.ReactNode;
  onClick?: (any: any) => void;
}
