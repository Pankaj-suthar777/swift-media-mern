import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Toaster />
          {children}
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default Providers;
