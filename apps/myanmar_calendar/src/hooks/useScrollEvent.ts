import { useRef, useEffect } from "react";

type ScrollCustomCallbackType={
  offsetHeight: number;
  scrollHeight: number;
  scrollTop: number;
};

function useScrollEvent (
  callBacks?: {
    untilOverflow?: () => void;
    onReachedTop?: () => void;
    onReachedBottom?: () => void;
    customCallback?: (props: ScrollCustomCallbackType) => void,
  },
) {
  const scrollRef=useRef<HTMLElement>();

  // Fire callback untill overflow
  useEffect(() => {
    if (!scrollRef.current) return;
    if (!callBacks?.untilOverflow) return;
    const { offsetHeight, scrollHeight } = scrollRef.current as HTMLDivElement;

    if (offsetHeight === scrollHeight) {
      console.log(offsetHeight, scrollHeight);
      callBacks?.untilOverflow();
    }
  }, [scrollRef, callBacks?.untilOverflow, callBacks]);

  let scrollTimeout = useRef<any>();

  useEffect(() => {
    if(!scrollRef.current) return;

    const scrollHandler = () => {
      const { offsetHeight, scrollHeight, scrollTop } =
        scrollRef.current as HTMLDivElement;

      if(callBacks?.customCallback) {
        callBacks.customCallback({
          offsetHeight,
          scrollHeight,
          scrollTop,
        });
      }

      // Fire Callback fn on scroll reached bottom
      if(callBacks?.onReachedBottom) {
        if (Math.floor(scrollHeight - scrollTop) === offsetHeight) {
          if (scrollTimeout.current !== null) {
            clearTimeout(scrollTimeout.current);
          }
          scrollTimeout.current = setTimeout(() => {
            callBacks?.onReachedBottom();
          }, 50);
        }
      }

      // Fire Callback fn on scroll reached top
      if(callBacks?.onReachedTop) {
        if (scrollTop === 0) {
          if (scrollTimeout.current !== null) {
            clearTimeout(scrollTimeout.current);
          }
          scrollTimeout.current = setTimeout(() => {
            callBacks?.onReachedTop();
          }, 50);
        }
      }
    };

    scrollHandler()

    scrollRef.current?.addEventListener("scroll", scrollHandler);

    return () => {
      scrollRef.current?.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollRef, callBacks]);

  return scrollRef;
}

export default useScrollEvent;
