import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../preloader/preloader";
import { useAppSelector } from "../app/app";

type ProtectedProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const Protected = ({ onlyUnAuth = false, component }: ProtectedProps) => {
  const location = useLocation();
  const isUserLogged = useAppSelector((state) => state.user.user);
  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  } else if (onlyUnAuth && isUserLogged) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isUserLogged) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, routeMessage: "Сначала авторизируйтесь" }}
      />
    );
  }
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: ProtectedProps) => (
  <Protected onlyUnAuth={true} component={component} />
);
