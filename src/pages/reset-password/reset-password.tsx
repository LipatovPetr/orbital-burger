import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./reset-password.module.css";
import cn from "classnames";
import { fetchRequest, handleResponse } from "../../utils/api/api";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormInputs } from "../../hooks/useForm";
import { useEffect } from "react";

function ResetPassword() {
  const navigate = useNavigate();
  const isResetInitiated = localStorage.getItem("password-status");
  const [errorMessage, setErrorMessage] = useState(null);
  const { handleChange, values } = useFormInputs();

  useEffect(() => {
    if (isResetInitiated) {
      return () => {
        localStorage.removeItem("password-status");
      };
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return fetchRequest("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return handleResponse(res);
      })
      .then(() => {
        localStorage.removeItem("password-status");
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }

  if (isResetInitiated) {
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Восстановление пароля</h2>
          <form
            onSubmit={handleSubmit}
            className={cn(styles.inputsContainer, "mt-6")}
          >
            <PasswordInput
              name="password"
              value={values.password || ""}
              placeholder={"Введите новый пароль"}
              onChange={handleChange}
              inputMode="text"
              required
            />
            <Input
              name="token"
              value={values.token || ""}
              type={"text"}
              inputMode="text"
              placeholder={"Введите код из письма"}
              onChange={handleChange}
              required
            />
            {errorMessage ? (
              <p className={styles.error}>{`${errorMessage}`}</p>
            ) : null}
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </form>

          <div className={cn(styles.linksContainer, "mt-20")}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
              <Link to="../login" className={styles.link}>
                {" "}
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default ResetPassword;
