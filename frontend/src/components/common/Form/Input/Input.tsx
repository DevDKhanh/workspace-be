//"use client";

import {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { convertCoin, price } from "~/common/func/convertCoin";
import { isValidNumber, isValidPassword } from "~/common/func/optionConvert";

import { BiLoader } from "react-icons/bi";
import { ContextForm } from "../Form";
import { IContextForm } from "../interfaces";
import ListHeadPhone from "../ListHeadPhone";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PropsInput } from "./interfaces";
import { QUERY_KEY } from "~/constants/enum";
import { RootState } from "~/redux/store";
import clsx from "clsx";
import i18n from "~/locale/i18n";
import isEmail from "~/common/func/isEmail";
import { isVietnamesePhoneNumberValid } from "~/common/func/isPhoneVN";
import styles from "./Input.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Input({
  label,
  placeholder = "",
  type = "text",
  name = "",
  isRequire,
  isPhone,
  isMail,
  max,
  min,
  isMoney,
  icon,
  dark,
  readOnly,
  confirm,
  isLoadingSend,
  hidden,
  iconBack,
  apccetPasswordNull,
  isNumber,
  onSend,
}: PropsInput) {
  const router = useRouter();
  const { phone } = router.query;

  const contextForm = useContext<IContextForm | null>(ContextForm);
  const [showPass, setShowPass] = useState(false);
  const [showHeadPhone, setShowHeadPhone] = useState(false);
  const isPassword = type === "password";
  const valueForm = useMemo(
    () => contextForm?.form?.[name],
    [contextForm?.form, name]
  );

  const hanleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    contextForm?.setCountSubmit(0);
    setMessage("");
    if (isMoney) {
      if (!Number(price(value))) {
        return contextForm?.setForm((prev: any) => ({
          ...prev,
          [name]: 0,
        }));
      }

      return contextForm?.setForm((prev: any) => ({
        ...prev,
        [name]: convertCoin(Number(price(value))),
      }));
    }

    contextForm?.setForm((prevForm: any) => ({ ...prevForm, [name]: value }));
  };

  const handleValidate = useCallback(
    (isGetStatus?: boolean) => {
      if (isRequire && `${valueForm}`?.trim() === "") {
        return isGetStatus
          ? false
          : setMessage(i18n.t("Vui lòng nhập trường này"));
      }

      if (!apccetPasswordNull) {
        if (type === "password" && !isValidPassword(valueForm)) {
          return isGetStatus
            ? false
            : setMessage(i18n.t("Độ dài tối thiểu 6 kí tự"));
        }
      }

      if (typeof min === "number" && type == "number" && valueForm < min) {
        return isGetStatus
          ? false
          : setMessage(i18n.t(`input.Giá trị phải lớn hơn hoặc bằng ${min}`));
      } else if (
        typeof min === "number" &&
        valueForm?.length > min &&
        type != "number"
      ) {
        return isGetStatus
          ? false
          : setMessage(i18n.t(`input.Độ dài tối thiểu ${min} kí tự`));
      }

      if (typeof max === "number" && type == "number" && valueForm > max) {
        return isGetStatus
          ? false
          : setMessage(i18n.t(`input.Giá trị phải nhỏ hơn hoặc bằng ${max}`));
      } else if (
        typeof max === "number" &&
        valueForm?.length > max &&
        type != "number"
      ) {
        return isGetStatus
          ? false
          : setMessage(i18n.t(`input.Độ dài tối đa ${max} kí tự`));
      }

      if (!!confirm && confirm !== valueForm) {
        return isGetStatus
          ? false
          : setMessage(i18n.t("Mật khẩu không trùng khớp"));
      }

      if (isMail && !isEmail(valueForm)) {
        return isGetStatus
          ? false
          : setMessage(i18n.t("Định dạng email không chính xác"));
      }

      if (isNumber && !isValidNumber(valueForm)) {
        console.log(isValidNumber(valueForm));
        return isGetStatus
          ? false
          : setMessage(i18n.t("Sai định dạng số điện thoại"));
      }
      // if (isPhone && !isVietnamesePhoneNumberValid(valueForm)) {
      //   return isGetStatus
      //     ? false
      //     : setMessage(i18n.t("Định dạng SĐT không chính xác"));
      // }

      return true;
    },
    [
      valueForm,
      isRequire,
      type,
      isMail,
      isPassword,
      isPhone,
      confirm,
      max,
      isNumber,
    ]
  );

  const setMessage = (msg: string) =>
    contextForm?.setErrorMessage((prev: any) => ({
      ...prev,
      [name]: msg,
    }));

  const handlerBlur = () => {
    handleValidate(true);
    handleValidate();
  };

  const handlerFocused = () => {
    contextForm?.setErrorMessage((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  /********** Xử lí khi value input thay đổi, kiểm tra validate input **********/
  useEffect(() => {
    contextForm?.setValidate((prev: any) => ({
      ...prev,
      [name]: handleValidate(true),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextForm?.form, isRequire]);

  useEffect(() => {
    if (contextForm?.countSubmit !== 0) handleValidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextForm?.countSubmit, isRequire]);

  return hidden ? null : (
    <label
      className={clsx(styles["container-input"], {
        [styles.error]: contextForm?.errorMessage?.[name],
        [styles.dark]: dark,
      })}
    >
      {label ? (
        <div className={styles.label}>
          {label} {isRequire ? <span style={{ color: "red" }}>*</span> : null}
        </div>
      ) : null}
      <div className={styles["group-input"]}>
        {icon ? <i>{icon}</i> : null}
        {/* {isPhone ? (
          <div
            className={styles.selectPhone}
            onClick={() => setShowHeadPhone(!showHeadPhone)}
          >
            <span>{phoneActive?.phoneNumberHeader}</span>
            <MdKeyboardArrowDown size={20} />
          </div>
        ) : null} */}
        <input
          onBlur={handlerBlur}
          onFocus={handlerFocused}
          value={valueForm}
          className={styles["input"]}
          name={name}
          placeholder={placeholder}
          type={showPass ? "text" : type}
          onChange={hanleChange}
          autoComplete="off"
          readOnly={readOnly}
        />
        {isPassword ? (
          <span
            className={styles["toggle-show-pass"]}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <RiEyeLine /> : <RiEyeOffLine />}
          </span>
        ) : null}
        {onSend ? (
          <div
            className={clsx(styles.sendBtn, {
              [styles.loading]: isLoadingSend,
            })}
            onClick={() => {
              !isLoadingSend && onSend();
            }}
          >
            {isLoadingSend ? (
              <div className={styles.load}>
                <i>
                  <BiLoader />
                </i>
              </div>
            ) : null}
            {i18n.t("input.Lấy OTP")}
          </div>
        ) : null}
        {iconBack ? <i className={styles.iconBack}>{iconBack}</i> : null}
      </div>
      {contextForm?.errorMessage?.[name] ? (
        <p className={styles["error-message"]}>
          {contextForm?.errorMessage?.[name]}
        </p>
      ) : null}
      {isPhone && showHeadPhone ? (
        <ListHeadPhone onClose={() => setShowHeadPhone(false)} />
      ) : null}
    </label>
  );
}

export default memo(Input);
