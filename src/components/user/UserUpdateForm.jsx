import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/states/userActions";
import { toast } from "react-toastify";
import useErrorHandler from "@/hooks/useErrorHandler";
import { errorMessage } from "@/redux/states/userActions";
import styles from "./UserUpdateForm.module.css";

const UserUpdateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorAction } = useErrorHandler();
  const user = useSelector((state) => state.user.data);

  const { loading, error } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      bio: user?.bio,
      address: user?.address,
      phone_number: user?.phone_number,
      birth_date: user?.birth_date,
    },
  });

  const onSubmit = (data) => {
    const afterSubmit = (error, res) => {
      if (error) {
        console.log(res.message);
        errorAction(errorMessage, '/auth');
      } else {
        toast(res.message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    };

    const dataObj = {
      data,
      callback: afterSubmit,
    };

    dispatch(updateUser(dataObj));
  };

  return (
    <div className={styles["user-form"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && <span>{errors.first_name.message}</span>}
        </div>

        <div>
          <label htmlFor="last_name">Last Name</label>
          <input id="last_name" {...register("last_name", {})} />
          {errors.last_name && <span>{errors.last_name.message}</span>}
        </div>

        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" type="textArea" {...register("bio", {})} />
          {errors.bio && <span>{errors.bio.message}</span>}
        </div>

        {/* <div>
          <label htmlFor="address">Adress</label>
          <input 
            id="address" 
            type='text'
            {...register("address", {})} />
          {errors.address && <span>{errors.address.message}</span>}
        </div> */}

        {/* <div>
          <label htmlFor="phone_number">Phone Number</label>
          <input 
            id="phone_number" 
            type='text'
            {...register("phone_number", {})} />
          {errors.phone_number && <span>{errors.phone_number.message}</span>}
        </div> */}

        <div>
          <label htmlFor="birth_date">Birth Day</label>
          <input
            id="birth_date"
            type="date"
            {...register("birth_date", {
              min: { message: "Must be at least 18" },
            })}
          />
          {errors.birth_date && <span>{errors.birth_date.message}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update User"}
        </button>

        {error && <div>Error: {error}</div>}
      </form>
    </div>
  );
};

export default UserUpdateForm;
