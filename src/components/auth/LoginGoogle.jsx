
import { useDispatch } from "react-redux";
import { googleSignIn } from "@/redux/states/userActions";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { authUser } from "@/redux/states/userSlice";

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const confirmation = () => {
      navigate('/profile')
    };

    const data = {
      token: credentialResponse.credential,
      callback: confirmation,
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
