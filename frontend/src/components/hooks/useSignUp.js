import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";


export const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (username, email, password) => {
    setLoading(true);

    const response = await fetch(process.env.REACT_APP_SIGN_UP, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      toast.error(json.error, { className: "my-toast-body" });
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      toast.success("Signed Up Succesfully.", { className: "my-toast-body" });
      //setTimeout(() => {
        //navigate("/main", { replace: true });
      //}, 3000);
      //updating auth context
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };

  return { signup, loading };
};
