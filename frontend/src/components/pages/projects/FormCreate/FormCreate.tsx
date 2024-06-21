import { memo, useState } from "react";
import useQueryParams, { useQueryNextJS } from "~/common/hooks/useQueryParams";

import Button from "~/components/common/Button";
import Form from "~/components/common/Form";
import Input from "~/components/common/Form/Input";
import PositionContainer from "~/components/common/PositionContainer";
import { PropsFormCreate } from "./interfaces";
import TextareaCustom from "~/components/common/TextareaCustom";
import styles from "./FormCreate.module.scss";

function FormCreate({}: PropsFormCreate) {
  const { query } = useQueryParams();
  const { setQuery } = useQueryNextJS();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  return (
    <PositionContainer
      open={query?.create == "open"}
      onClose={() =>
        setQuery({
          create: null,
        })
      }
    >
      <div className={styles.container}>
        <h3>Thêm mới dự án</h3>
        <Form form={form} setForm={setForm} onSubmit={() => {}}>
          <Input
            name="name"
            label="Tên dự án"
            placeholder="Nhập tên dự án"
            isRequire
          />
          <div className={styles["mt-24"]}>
            <TextareaCustom
              value={form.description}
              name={"description"}
              setForm={setForm}
            />
          </div>
          <div className={styles.groupButton}>
            <Button primary rounded_6>
              Thêm mới
            </Button>
            <Button
              grey
              rounded_6
              onClick={() =>
                setQuery({
                  create: null,
                })
              }
            >
              Đóng lại
            </Button>
          </div>
        </Form>
      </div>
    </PositionContainer>
  );
}

export default memo(FormCreate);
