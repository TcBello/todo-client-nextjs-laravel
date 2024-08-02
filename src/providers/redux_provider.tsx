"use client";

import { saveReduxState } from "@/data/local/redux_state_local_storage";
import { AppStore, store } from "@/redux/store";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = store();
  }

  /**
   * Handles the listening of redux state and saving to local storage
   * for redux state persistence
   */
  useEffect(() => {
    const unsubscribe = storeRef.current?.subscribe(() => {
      saveReduxState(storeRef.current?.getState());
    });

    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default ReduxProvider;
