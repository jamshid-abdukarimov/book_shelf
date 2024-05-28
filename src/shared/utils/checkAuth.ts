import { login } from "features/login";
import { NavigateFunction } from "react-router-dom";
import { logout } from "shared/model/auth";

export default async function (navigate: NavigateFunction, dispatch: any) {
  if (!localStorage.getItem("userData")) {
    return navigate("/signin");
  } else {
    try {
      const data = JSON.parse(localStorage.getItem("userData") || "");
      dispatch(login(data));
    } catch (error) {
      console.log(error);
      navigate("/signin");
      dispatch(logout());
    }
  }
}
