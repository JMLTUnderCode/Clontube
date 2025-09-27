import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { AUTH_STATE } = useAuthentication();

    useEffect(() => {
        if (AUTH_STATE.isAuthenticated === false) {
            navigate("/");
        }
    }, [AUTH_STATE.isAuthenticated, navigate]);
    
    return <>{children}</>;
};