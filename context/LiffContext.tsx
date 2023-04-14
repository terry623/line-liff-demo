import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { Liff } from "@line/liff/exports";

const liffId = process.env.NEXT_PUBLIC_LIFF_ID!;

const LiffContext = createContext<{
  liff: Liff | null;
  liffError: string | null;
}>({
  liff: null,
  liffError: null,
});

export function LiffContextProvider({ children }: { children: ReactNode }) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");

        liff
          .init({ liffId })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((err: Error) => {
            console.log("LIFF init failed.");
            setLiffError(err.toString());
          });
      });
  }, []);

  const contextValue = useMemo(
    () => ({ liff: liffObject, liffError }),
    [liffObject, liffError]
  );

  return (
    <LiffContext.Provider value={contextValue}>{children}</LiffContext.Provider>
  );
}

export const useLiffContext = () => useContext(LiffContext);
