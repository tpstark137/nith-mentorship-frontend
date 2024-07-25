import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    toast.success("Logout successfully");
    navigate("/");
  }, [navigate]);

  return null;
}

export default Logout;
