import styles from "./login.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../components/app/app";
import { login, clearError } from "../../store/slices/user/user";

import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  // const formElement = useRef<HTMLFormElement>()!;
  const errorMessage = useAppSelector((state) => state.user.error);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearError());
      return () => {
        clearTimeout(timer);
      };
    }, 3000);
  }, [errorMessage]);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    dispatch(login(loginFormData));
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Вход</h2>
        <form
          // ref={formElement}
          name="Login form"
          onSubmit={handleSubmit}
          className={cn(styles.inputsContainer, "mt-6")}
        >
          <EmailInput
            name="email"
            inputMode="email"
            onChange={handleChange}
            value={loginFormData.email}
            required
          />
          <PasswordInput
            name="password"
            inputMode="text"
            onChange={handleChange}
            value={loginFormData.password}
            required
          />
          {errorMessage ? (
            <p className={styles.error}>{`Error: ${errorMessage}`}</p>
          ) : null}
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>

        <div className={cn(styles.linksContainer, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?{" "}
            <Link to="../register" className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{" "}
            <Link to="../forgot-password" className={styles.link}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
