import styles from "./profile-edit.module.css";
import cn from "classnames";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../components/app/app";
import { editUser, clearError } from "../../../store/slices/user/user";
import { UserAllFields } from "../../../store/slices/user/types";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user)!;

  const [formData, setRegisterFormData] = useState<UserAllFields>({
    name: user.name,
    email: user.email,
    password: "",
  });

  const isFormChanged =
    formData.name !== user.name ||
    formData.email !== user.email ||
    formData.password;

  function handleChange(event: any) {
    const { name, value } = event.target;
    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    dispatch(editUser(formData));
    setRegisterFormData({
      ...formData,
      password: "",
    });
  }

  function handleReset(event: any) {
    event.preventDefault();
    setRegisterFormData({
      name: user.name,
      email: user.email,
      password: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className={cn(styles.container)}>
      <Input
        type={"text"}
        value={formData.name}
        name={"name"}
        placeholder={"Имя"}
        icon="EditIcon"
        onChange={handleChange}
        minLength={2}
        maxLength={30}
        required
      />
      <EmailInput
        value={formData.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        // icon="EditIcon"
        onChange={handleChange}
        required
      />
      <PasswordInput
        value={formData.password}
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
  );
}

export default Profile;
