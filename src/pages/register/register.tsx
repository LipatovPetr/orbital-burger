import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../components/app/app";
import { Link } from "react-router-dom";
import { register, clearError } from "../../store/slices/user/user";
import toast from "react-hot-toast";
import cn from "classnames";

import styles from "./register.module.css";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.user.error);
  const registerStatus = useAppSelector((state) => state.user.registerStatus);

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
  }, [errorMessage]);

  function handleChange(event: any): void {
    console.log(event);
    console.log(typeof event);
    const { name, value } = event.target;
    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: any): void {
    event.preventDefault();
    dispatch(register(registerFormData));
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
            value={registerFormData.name}
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            required
          />
          <EmailInput
            name="email"
            value={registerFormData.email}
            inputMode="email"
            onChange={handleChange}
            required
          />
          <PasswordInput
            name="password"
            value={registerFormData.password}
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
