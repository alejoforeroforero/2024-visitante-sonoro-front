import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import UserUpdateForm from "@/components/user/UserUpdateForm";

const errorMessage = "Lo sentimos, se ha producido un error inesperado en el sistema. Por seguridad, serás redirigido a la página de autorización";

const EditUserProfilePage = () => {
  const data = useUserStore((state) => state.data);
  const isAuthorized = useUserStore((state) => state.isAuthorized);
  const navigate = useNavigate();

  useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      toast(errorMessage);

      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    }
  }, [isAuthorized, navigate]);

  return (
    <div>
      {data && <UserUpdateForm />}
      {!data && <p>No tienes permisos</p>}
    </div>
  );
};

export default EditUserProfilePage;
