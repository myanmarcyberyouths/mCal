import { useEffect, useState } from "react";

function useWindowResize(callback: () => void, disabled = false) {
  useEffect(() => {
    const handleResize = () => {
      if (disabled) return;
      callback();
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback, disabled]);
}

export default useWindowResize;
