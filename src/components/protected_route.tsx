"use client";

import { getToken } from "@/data/local/token_data_local_storage";
import { useAuth } from "@/providers/auth_provider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = (WrappedComponent: any) => {
  return function protectedRoute(props: any) {
    const auth = useAuth();

    /**
     * Handles the redirection of the page when there are no
     * existing token
     */
    useEffect(() => {
      const existingToken = getToken();

      if (auth?.token == null && existingToken == null) {
        return redirect("/");
      }
    }, [auth?.token]);

    if (auth?.token == null) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
