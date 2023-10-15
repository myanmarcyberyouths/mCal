import { useEffect, useRef } from "react";

function useOnClickOutside(handler: () => void, disabled = false, event = "mouseup") {
  const ref = useRef<any>();

  useEffect(() => {
    if (disabled) return;
    const listener = (event: any) => {
      if (!ref.current || ref.current?.contains(event?.target)) return;
      handler();
    };

    document.addEventListener(event, listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener(event, listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, ref, disabled, event]);

  return ref;
}

export default useOnClickOutside;
