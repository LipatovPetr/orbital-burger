import styles from "./login.module.css";
import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useEffect, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../components/app/app";
import { login, clearError } from "../../store/slices/user/user";
import toast from "react-hot-toast";
import { useFormInputs } from "../../hooks/useForm";
import { UserEmailAndPassword } from "../../store/slices/user/types";

import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Login() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { handleChange, values } = useFormInputs();

  const errorMessage = useAppSelector((state) => state.user.error);

  useEffect(() => {
    function renderRouteMessage() {
      if (location.state && location.state.routeMessage) {
        const notify = () => toast.error(location.state.routeMessage);
        notify();
      }
    }
    renderRouteMessage();
  }, [location.state]);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(login(values as UserEmailAndPassword));
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Вход</h2>
        <form
          name="Login form"
          onSubmit={handleSubmit}
          className={cn(styles.inputsContainer, "mt-6")}
        >
          <EmailInput
            name="email"
            inputMode="email"
            onChange={handleChange}
            value={values.email}
            required
          />
          <PasswordInput
            name="password"
            inputMode="text"
            onChange={handleChange}
            value={values.password}
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
