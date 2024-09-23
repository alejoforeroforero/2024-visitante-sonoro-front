import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "@/redux/states/userSlice";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (accessToken) {
      dispatch(authUser(true));
    }
  }, [dispatch]);
}

export default useAuth;