"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import AuthInitializer from "./AuthInitializer";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>
    <AuthInitializer />
    {children}
    </Provider>;
};

export default ReduxProvider;
