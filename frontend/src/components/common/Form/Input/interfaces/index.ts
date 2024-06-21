export interface PropsInput {
  label?: string;
  placeholder?: string;
  confirm?: any;
  name?: string;
  type?: "text" | "password" | "number" | "radio" | "email";
  isRequire?: boolean;
  isMoney?: boolean;
  dark?: boolean;
  readOnly?: boolean;
  isLoadingSend?: boolean;
  isPhone?: boolean;
  isNumber?: boolean;
  isMail?: boolean;
  max?: number;
  min?: number;
  icon?: any;
  iconBack?: any;
  onSend?: () => void;
  hidden?: boolean;
  apccetPasswordNull?: boolean
}
