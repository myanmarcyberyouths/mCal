import { endOfDay } from "date-fns";
import React, { useEffect, useRef, useState } from "react";

function useDayEndInterval(callback: () => void, triggerOnStart: boolean = true) {
  const [timeRemains, setTimeRemains] = useState(endOfDay(new Date()).getTime() - Date.now());

  useEffect(() => {
    if (!triggerOnStart) return;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerOnStart]);

  let dayEndTimeoutRef = useRef<any>();

  useEffect(() => {
    const startTimeout = () => {
      dayEndTimeoutRef.current = setTimeout(() => {
        callback();
        console.log(timeRemains);
        setTimeRemains(1000 * 60 * 60 * 24);
        startTimeout();
      }, timeRemains);
    };

    startTimeout();

    return () => {
      clearTimeout(dayEndTimeoutRef.current);
    };
  }, [callback, timeRemains]);
}

export default useDayEndInterval;
