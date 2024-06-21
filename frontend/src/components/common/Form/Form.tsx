//"use client";

import {
  FormEvent,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { IContextForm, PropsForm } from "./interfaces";

import clsx from "clsx";
import styles from "./Form.module.scss";

export const ContextForm = createContext<IContextForm | null>(null);

function Form({ children, onSubmit, form, setForm, isFull }: PropsForm) {
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [countSubmit, setCountSubmit] = useState<number>(0);
  const [validate, setValidate] = useState<any>(null);

  const isDone = useMemo(() => {
    if (!validate) {
      return false;
    }

    for (let i in validate) {
      if (!validate[i]) {
        return false;
      }
    }
    return true;
  }, [validate]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isDone) {
        onSubmit && onSubmit();
        return;
      }
      setCountSubmit((prev) => prev + 1);
    },
    [isDone, onSubmit, countSubmit]
  );

  return (
    <ContextForm.Provider
      value={{
        form,
        setForm,
        errorMessage,
        setErrorMessage,
        countSubmit,
        setCountSubmit,
        setValidate,
      }}
    >
      <form onSubmit={submit} className={clsx({ [styles.isFull]: isFull })}>{children}</form>
    </ContextForm.Provider>
  );
}

export default Form;
