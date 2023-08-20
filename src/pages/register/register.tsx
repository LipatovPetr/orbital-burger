import React, { useEffect, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../components/app/app";
import { Link } from "react-router-dom";
import { register, clearError } from "../../store/slices/user/user";
import cn from "classnames";
import { useFormInputs } from "../../hooks/useForm";
import styles from "./register.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserAllFields } from "../../store/slices/user/types";

function Register() {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.user.error);
  const { handleChange, values } = useFormInputs();

  useEffect(() => {
    function clearFormError() {
      const timer = setTimeout(() => {
        dispatch(clearError());
        return () => {
          clearTimeout(timer);
        };
      }, 3000);
    }
    clearFormError();
  }, [dispatch, errorMessage]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(register(values as UserAllFields));
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Регистрация</h2>
        <form
          onSubmit={handleSubmit}
          className={cn(styles.inputsContainer, "mt-6")}
        >
          <Input
            name="name"
            value={values.name}
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            required
          />
          <EmailInput
            name="email"
            value={values.email}
            inputMode="email"
            onChange={handleChange}
            required
          />
          <PasswordInput
            name="password"
            value={values.password}
            inputMode="text"
            onChange={handleChange}
            required
          />
          {errorMessage ? (
            <p className={styles.error}>{`Error: ${errorMessage}`}</p>
          ) : null}
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className={cn(styles.linksContainer, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?{" "}
            <Link to="../login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
