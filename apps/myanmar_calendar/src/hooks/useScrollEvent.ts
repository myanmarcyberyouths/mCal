import { useRef, useEffect } from "react";

type ScrollCusomCallbackType = {
  offsetHeight: number;
  scrollHeight: number;
  scrollTop: number;
};

function useScrollEvent(
  customCallback: (props: ScrollCusomCallbackType) => void,
  callBacks?: {
    untilOverflow: () => void;
    reachedTop: () => void;
    reachedBottom: () => void;
  }
) {
  const scrollRef = useRef<any>();

  // Fire CustomCallback untill overflow
  useEffect(() => {
    if (!scrollRef.current) return;
    if (!callBacks?.untilOverflow) return;
    const { offsetHeight, scrollHeight } = scrollRef.current as HTMLDivElement;

    if (offsetHeight === scrollHeight) {
      console.log(offsetHeight, scrollHeight);
      callBacks?.untilOverflow();
    }
  }, [scrollRef, customCallback, callBacks?.untilOverflow]);

  let scrollTimeout = useRef<any>();

  useEffect(() => {
    const scrollHandler = () => {
      const { offsetHeight, scrollHeight, scrollTop } = scrollRef.current as HTMLDivElement;
      // console.log(offsetHeight, scrollHeight, scrollTop);

      customCallback({
        offsetHeight,
        scrollHeight,
        scrollTop,
      });

      // Fire Callback fn on scroll reached bottom
      if (callBacks?.reachedBottom) {
        if (Math.floor(scrollHeight - scrollTop) === offsetHeight) {
          if (scrollTimeout.current !== null) {
            clearTimeout(scrollTimeout.current);
          }
          scrollTimeout.current = setTimeout(() => {
            callBacks?.reachedBottom();
          }, 200);
        }
      }

      // Fire Callback fn on scroll reached top
      if (callBacks?.reachedTop) {
        if (scrollTop === 0) {
          if (scrollTimeout.current !== null) {
            clearTimeout(scrollTimeout.current);
          }
          scrollTimeout.current = setTimeout(() => {
            callBacks?.reachedTop();
          }, 50);
        }
      }
    };

    scrollRef.current?.addEventListener("scroll", scrollHandler);

    return () => {
      scrollRef.current?.removeEventListener("scroll", scrollHandler);
    };
  }, [customCallback, scrollRef, callBacks?.reachedBottom, callBacks?.reachedTop]);

  return scrollRef;
}

export default useScrollEvent;
