import { Fragment, memo, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useQueryParams, { useQueryNextJS } from "~/common/hooks/useQueryParams";

import Button from "~/components/common/Button";
import Form from "~/components/common/Form";
import Input from "~/components/common/Form/Input";
import Loading from "~/components/common/Loading";
import PositionContainer from "~/components/common/PositionContainer";
import { PropsFormEdit } from "./interfaces";
import { QUERY_KEY } from "~/constants/enum";
import TextareaCustom from "~/components/common/TextareaCustom";
import { httpRequest } from "~/services";
import positionsService from "~/services/positionsService";
import styles from "./FormEdit.module.scss";

function FormEdit({}: PropsFormEdit) {
  const clientQuery = useQueryClient();

  const { query } = useQueryParams();
  const { setQuery } = useQueryNextJS();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const edit = useMutation({
    mutationFn: () =>
      httpRequest({
        http: positionsService.update({ ...form, id: query?.edit }),
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
          edit: null,
        });
      }
    },
  });

  const data = useQuery({
    queryKey: [QUERY_KEY.positions, query?.edit],
    queryFn: () =>
      httpRequest({
        http: positionsService.findOne({
          id: query?.edit,
        }),
      }),
  });

  useEffect(() => {
    if (data?.data) {
      setForm(data?.data);
    }
  }, [data.data]);

  return (
    <Fragment>
      <Loading loading={edit.isPending} />
      <PositionContainer
        open={!!query?.edit}
        onClose={() =>
          setQuery({
            edit: null,
          })
        }
      >
        <div className={styles.container}>
          <h3>Sửa chức vụ</h3>
          <Form form={form} setForm={setForm} onSubmit={edit.mutate}>
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
                    edit: null,
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

export default memo(FormEdit);
