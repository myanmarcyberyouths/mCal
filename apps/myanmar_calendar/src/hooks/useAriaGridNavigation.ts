import aria from '@/aria';
import React, {MutableRefObject, useEffect, useRef} from 'react'

interface AriaGridNavigationHookProps {
  rowSelector: string
  colSelector: string
  onReachStart?: () => void
  onReachEnd?: () => void
}

function useAriaGridNavigation ({rowSelector, colSelector, onReachEnd, onReachStart}: AriaGridNavigationHookProps, depArray: any[], ref?: MutableRefObject<HTMLElement | undefined>) {

  const parentNode = ref || useRef<HTMLElement>();

  useEffect(() => {
    const grid = aria.grid(parentNode.current, {
      rowSelector,
      colSelector,
      handlers: {
        onReachStart,
        onReachEnd
      }
    })

    grid.registerEvents()

    return () => grid.clearEvents()
  }, [...depArray]);

  return parentNode;

}

export default useAriaGridNavigation