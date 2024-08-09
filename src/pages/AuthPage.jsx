import { useSelector } from "react-redux";
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  if (token) {
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
