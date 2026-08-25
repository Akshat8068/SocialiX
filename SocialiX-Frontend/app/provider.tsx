"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux"
import ThemeProvider from "./theme.provider";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const Providers = ({
  children,
}: ReduxProviderProps) => {
  return <Provider store={store}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </Provider>
}

export default Providers