import { Fragment, memo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryParams, { useQueryNextJS } from "~/common/hooks/useQueryParams";

import Button from "~/components/common/Button";
import Form from "~/components/common/Form";
import Input from "~/components/common/Form/Input";
import Loading from "~/components/common/Loading";
import PositionContainer from "~/components/common/PositionContainer";
import { PropsFormCreate } from "./interfaces";
import { QUERY_KEY } from "~/constants/enum";
import TextareaCustom from "~/components/common/TextareaCustom";
import { httpRequest } from "~/services";
import positionsService from "~/services/positionsService";
import styles from "./FormCreate.module.scss";

function FormCreate({}: PropsFormCreate) {
  const clientQuery = useQueryClient();

  const { query } = useQueryParams();
  const { setQuery } = useQueryNextJS();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const create = useMutation({
    mutationFn: () =>
      httpRequest({
        http: positionsService.create(form),
      }),
    onSuccess: (res) => {
      if (res) {
        setForm({
          name: "",
          description: "",
        });
        clientQuery.invalidateQueries({
          queryKey: [QUERY_KEY.positions],
        });
        setQuery({
          create: null,
        });
      }
    },
  });

  return (
    <Fragment>
      <Loading loading={create.isPending} />
      <PositionContainer
        open={query?.create == "open"}
        onClose={() =>
          setQuery({
            create: null,
          })
        }
      >
        <div className={styles.container}>
          <h3>Thêm mới chức vụ</h3>
          <Form form={form} setForm={setForm} onSubmit={create.mutate}>
            <Input
              name="name"
              label="Tên chức vụ"
              placeholder="Nhập tên chức vụ"
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
    </Fragment>
  );
}

export default memo(FormCreate);
