import { useEffect } from "react";

type Key = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | "Enter" | "Escape" | "Tab";

const useKeyPress = (key: Key, callback: () => void, disabled = false) => {
  useEffect(() => {
    if (disabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      // event.preventDefault();
      event.stopPropagation();
      if (event.key === key) callback();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [callback, key, disabled]);
};

export default useKeyPress;
