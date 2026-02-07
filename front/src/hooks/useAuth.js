import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

function useAuth() {
  const setAuthorized = useUserStore((state) => state.setAuthorized);

  useEffect(() => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (accessToken) {
      setAuthorized(true);
    }
  }, [setAuthorized]);
}

export default useAuth;
