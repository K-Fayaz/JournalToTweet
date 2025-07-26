// client/src/components/ProtectedLanding.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

const ProtectedLanding = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/journal", { replace: true });
    }
    // If not logged in, do nothing (LandingPage will render)
  }, [navigate]);

  // Show landing only if not logged in
  return !localStorage.getItem("token") ? <LandingPage /> : null;
};

export default ProtectedLanding;