import { useEffect } from "react";

type Key =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Enter"
  | "Escape"
  | "Tab";

const useKeyPress = (key: Key, focusRef, callback: () => void, disabled = false) => {
  const element = focusRef.current || window

  useEffect(() => {
    if (disabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if(event.key !== key) return
      event.stopPropagation();
      callback();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);

    };
  }, [callback, key, disabled]);
};

export default useKeyPress;
