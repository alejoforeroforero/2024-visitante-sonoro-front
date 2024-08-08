import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserUpdateForm from "@/components/user/UserUpdateForm";

const EditUserProfilePage = () => {
    const { data, isAuthorized } = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    useEffect(()=>{
      if(!isAuthorized){
        navigate('/')
      }
    }, [isAuthorized])
  
    return (
      <div>
        {data && <UserUpdateForm />}
        {!data && <p>No tienes permisos</p>}
      </div>
    );
}

export default EditUserProfilePage
