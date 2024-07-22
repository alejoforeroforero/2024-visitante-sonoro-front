import { useSelector } from "react-redux";
import AuthForm from "@/components/AuthForm";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  if (token) {
    navigate("/");
  }

  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
