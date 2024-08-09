import { useDispatch } from "react-redux";
import { googleSignIn } from "@/redux/states/userActions";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import useErrorHandler from "@/hooks/useErrorHandler";

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorAction } = useErrorHandler();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const afterSubmit = (error, res) => {
      if (error) {
        errorAction(res.message);
      } else {
        toast(res.message);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    };

    const data = {
      token: credentialResponse.credential,
      callback: afterSubmit,
    };

    dispatch(googleSignIn(data));
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
          console.log("Login failed");
        }}
      />
    </div>
  );
};

export default LoginGoogle;
