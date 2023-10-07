import { useEffect, useState } from "react";

function useWindowSize(
  callback?: () => void,
  callFnOn?: {
    condition: "greater" | "lesser";
    width: number;
    height: number;
  }
) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      callback && callback();
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback]);

  return {
    windowWidth,
    windowHeight,
  };
}

export default useWindowSize;
