import { useSelector } from "react-redux";

export function isUserLogged() {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.user);
  return isAuthChecked && !user;
}
