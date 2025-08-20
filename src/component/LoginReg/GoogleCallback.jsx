import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract query params from callback URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token); // save token in localStorage
      navigate("/profile"); // redirect user to profile (or dashboard)
    } else {
      navigate("/login"); // fallback if no token
    }
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
}
