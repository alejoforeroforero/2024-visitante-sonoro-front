import { useUserStore } from "@/stores/useUserStore";
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();
  const isAuthorized = useUserStore((state) => state.isAuthorized);

  if (isAuthorized) {
    navigate("/");
  }

  return (
    <div>
      <ToastContainer />
      <AuthForm />
    </div>
  );
};

export default AuthPage;
