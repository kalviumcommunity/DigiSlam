import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    const response = await fetch(
      process.env.REACT_APP_LOGIN,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      toast.error(json.error, { className: "my-toast-body" });
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      toast("Login Succesful", { className: "my-toast-body" });
      setTimeout(() => {
        navigate("/main", { replace: true });
      }, 3500);
      //updating auth context
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };

  return { login, loading, error };
};
