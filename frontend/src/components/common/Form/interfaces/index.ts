export interface PropsForm {
  children: React.ReactNode;
  onSubmit?: () => void;
  form: any;
  setForm: (any: any) => void;
  isFull?: boolean
}

export interface IContextForm {
  form: any;
  setForm: (any: any) => void;
  errorMessage: any;
  setErrorMessage: (any: any) => void;
  countSubmit: number;
  setCountSubmit: (num: number) => void;
  setValidate: (any: any) => void;
}
