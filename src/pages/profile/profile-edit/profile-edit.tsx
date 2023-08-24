import styles from "./profile-edit.module.css";
import cn from "classnames";
import { SyntheticEvent, useState, ChangeEvent, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../../components/app/app";
import { editUser, clearError } from "../../../store/slices/user/user";
import { UserAllFields } from "../../../store/slices/user/types";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormInputs } from "../../../hooks/useForm";
import { useEffect } from "react";
import Preloader from "../../../components/preloader/preloader";

function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user)!;
  const { values, handleChange, setValues } = useFormInputs();

  useEffect(() => {
    setValues({
      name: user.name,
      email: user.email,
      password: "",
    });
  }, []);

  const isFormChanged =
    values.name !== user.name || values.email !== user.email || values.password;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(editUser(values));
    setValues({
      ...values,
      password: "",
    });
  }

  function handleReset(event: SyntheticEvent) {
    event.preventDefault();
    setValues({
      name: user.name,
      email: user.email,
      password: "",
    });
  }

  return values.name ? (
    <form onSubmit={handleSubmit} className={cn(styles.container)}>
      <Input
        type={"text"}
        inputMode={"text"}
        value={values.name}
        name={"name"}
        placeholder={"Имя"}
        icon="EditIcon"
        onChange={handleChange}
        minLength={2}
        maxLength={30}
        required
        contentEditable="true"
      />
      <EmailInput
        value={values.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        onChange={handleChange}
        required
      />
      <PasswordInput
        value={values.password || ""}
        name={"password"}
        icon="EditIcon"
        onChange={handleChange}
        minLength={4}
      />
      {isFormChanged && (
        <div>
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleReset}
          >
            Отменить
          </Button>

          <Button htmlType="submit" extraClass={styles.button}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  ) : (
    <Preloader />
  );
}

export default Profile;
