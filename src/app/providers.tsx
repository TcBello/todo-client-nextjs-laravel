import { AuthProvider } from "@/providers/auth_provider";
import { LoaderProvider } from "@/providers/loader_provider";
import ReduxProvider from "@/providers/redux_provider";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ReduxProvider>
        <AuthProvider>
          <LoaderProvider>{children}</LoaderProvider>
        </AuthProvider>
      </ReduxProvider>
    </NextUIProvider>
  );
}

export default Providers;
