import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useErrorHandler = () => {
  const navigate = useNavigate();

  const showErrorToast = (message) => {
    toast.error(message);
  };

  const redirectOnError = (delayInMs = 2000) => {
    setTimeout(() => {
      navigate("/auth");
    }, delayInMs);
  };

  const errorAction = (message, redirect = false) => {
    showErrorToast(message);
    if (redirect) {
      redirectOnError();
    }
  };

  return { showErrorToast, redirectOnError, navigate, errorAction };
};

export default useErrorHandler;
