import {
  AnimatePresence,
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
// import { Dialog, ModalOverlay, Modal, Button, Heading } from "react-aria-components";
import { Dialog, Transition } from "@headlessui/react";

import React, {
  Children,
  PropsWithChildren,
  ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import useScrollEvent from "@/hooks/useScrollEvent";

// Wrap React Aria modal components so they support framer-motion values.
const MotionDialog = motion(Dialog);
const MotionDialogPanel = motion(Dialog.Panel);

const inertiaTransition = {
  type: "inertia",
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

const SHEET_MARGIN = 50;
const SHEET_RADIUS = 12;

export default function BottomSheetMobile({
  isOpen,
  onClose,
  remountScrollRefOn,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  remountScrollRefOn?: any;
} & PropsWithChildren) {
  // let [isOpen, setOpen] = useState(false);
  let h = window.innerHeight - SHEET_MARGIN;
  let y = useMotionValue(h);
  let bgOpacity = useTransform(y, [0, h], [0.4, 0]);
  let bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  // Scale the background down and adjust the border radius when the sheet is open.
  let bodyScale = useTransform(
    y,
    [0, h],
    [(window.innerWidth - SHEET_MARGIN) / window.innerWidth, 1],
  );
  let bodyTranslate = useTransform(y, [0, h], [SHEET_MARGIN - SHEET_RADIUS, 0]);
  let bodyBorderRadius = useTransform(y, [0, h], [SHEET_RADIUS, 0]);

  // Disabling drag if content has scroll

  const [draggable, setDraggable] = useState<
    "top" | "bottom" | "float" | "neutral"
  >("neutral");

  const scrollRef = useScrollEvent({
    onReachedTop: () => setDraggable("top"),
    onReachedBottom: () => setDraggable("bottom"),
    customCallback: ({ offsetHeight, scrollHeight, scrollTop }) => {
      if (
        scrollTop !== 0 &&
        Math.floor(scrollHeight - scrollTop) > offsetHeight
      )
        setDraggable("float");
    },
  });

  const childrenWithProps = React.Children.map(
    children,
    (child: React.DetailedReactHTMLElement<any, HTMLElement>) =>
      React.cloneElement(child, {
        ref: scrollRef,
      }),
  );

  return (
    <motion.div
      className="h-full overflow-auto bg-white"
      style={{
        scale: bodyScale,
        borderRadius: bodyBorderRadius,
        y: bodyTranslate,
        transformOrigin: "center 0",
      }}
    >
      {/* <Button
        className="text-blue-600 text-lg font-semibold my-8 outline-none rounded data-[pressed]:text-blue-700 data-[focus-visible]:ring"
        onPress={() => setOpen(true)}>
        Open sheet
      </Button> */}
      <AnimatePresence>
        {isOpen && (
          <MotionDialog
            // Force the modal to be open when AnimatePresence renders it.
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-10"
            style={{ backgroundColor: bg }}
          >
            <MotionDialogPanel
              className="absolute bottom-0 w-full rounded-t-xl bg-gray-0 shadow-lg dark:bg-gray-50"
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{
                y,
                top: SHEET_MARGIN,
                // Extra padding at the bottom to account for rubber band scrolling.
                paddingBottom: window.screen.height,
              }}
              drag={draggable === "float" ? "" : "y"}
              dragConstraints={{ top: 0 }}
              dragElastic={{
                top: draggable === "top" ? 0 : 0.3,
                bottom: draggable === "bottom" ? 0 : 0.3,
              }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  onClose();
                } else {
                  // @ts-ignore
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              {/* drag affordance */}
              <div className="mx-auto mt-2 h-[0.3rem] w-12 rounded-full bg-gray-300" />
              <div className="outline-none">
                <div className="mb-2 flex justify-end px-4 ">
                  {/* <button
                    className="text-blue-600 text-lg font-semibold outline-none rounded data-[pressed]:text-blue-700 data-[focus-visible]:ring"
                    onClick={onClose}>
                    Done
                  </button> */}
                </div>
                <div className="__scrollbar-sm h-[calc(100vh-5rem)] supports-[height:100cqh]:h-[calc(100cqh-5rem)] supports-[height:100svh]:h-[calc(100svh-5rem)]">
                  {childrenWithProps}
                </div>
              </div>
              {/* <div className="h-[3rem]"></div> */}
            </MotionDialogPanel>
          </MotionDialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
