import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isEmailVerified = localStorage.getItem("isEmailVerified");
    if (isEmailVerified === "false") {
      navigate("/email-verification", { replace: true });
    }
  }, [navigate]);

  // Only render children if email is verified
  return localStorage.getItem("isEmailVerified") !== "false" ? <>{children}</> : null;
};

export default ProtectedRoute; 