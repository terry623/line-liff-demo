import "../styles/globals.css";
import type { AppProps } from "next/app";

import { LiffContextProvider } from "../context/LiffContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiffContextProvider>
      <Component {...pageProps} />
    </LiffContextProvider>
  );
}

export default MyApp;
