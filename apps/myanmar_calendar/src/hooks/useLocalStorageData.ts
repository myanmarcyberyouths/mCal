import React, { useEffect } from "react";
import { useReadLocalStorage } from "./useReadLocalStorage";

function useLocalStorageData(key: string, callback: () => void) {
  const localData = useReadLocalStorage(key);

  useEffect(() => {
    callback();
  }, [localData, callback]);
}

export default useLocalStorageData;
