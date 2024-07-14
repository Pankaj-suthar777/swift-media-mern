import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "@/context/SocketContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Toaster />
          <SocketContextProvider>{children}</SocketContextProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default Providers;
