import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import useErrorHandler from "@/hooks/useErrorHandler";
import styles from "./UserUpdateForm.module.css";

const errorMessage = "Lo sentimos, se ha producido un error inesperado en el sistema. Por seguridad, serás redirigido a la página de autorización";

const UserUpdateForm = () => {
  const navigate = useNavigate();
  const { errorAction } = useErrorHandler();
  const user = useUserStore((state) => state.data);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const updateUser = useUserStore((state) => state.updateUser);

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
        errorAction(errorMessage, '/auth');
      } else {
        toast(res.message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    };

    updateUser(data, afterSubmit);
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
