import React, {Fragment, forwardRef, useEffect, useRef, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { FiMaximize2 } from "react-icons/fi";
import { Button } from "@/components/ui/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewEventDialongTargetDay,
  updateDayDialongTargetDay,
} from "@/store/modelControlState";
import { format, isToday } from "date-fns";
import { englishToMyanmarDate } from "burma-calendar";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { RootState } from "@/store";
import { ASTRO_EVENT_LIST } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { PiCaretDownBold } from "react-icons/pi";
import { GrDown } from "react-icons/gr";
import useKeyPress from "@/hooks/useKeyPress";
import { modifyColorOpacity } from "@/utils/styleHelpers";
import { getAllEventsOfDay } from "@/event_calendars/formatEvent";

export interface DayDialogContentProps {
  onClose: () => void;
  selectedDay: Date;
}

const DayDialogContent = forwardRef(({onClose, selectedDay}: DayDialogContentProps, ref) => {
  const dispatch = useDispatch();
  const mmDate = englishToMyanmarDate(selectedDay);
  const { eventCalendars, show } = useSelector(
    (state: RootState) => state.calendarState,
  );
  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );
  let dayIsToday = isToday(selectedDay);

  const checkedEvents = getAllEventsOfDay(
    selectedDay,
    eventCalendars.filter((calendar) => calendar.checked === true),
  );

  const hasEvents = checkedEvents.reduce((prev, eventCalendar) => {
    if (!prev && eventCalendar.events.length > 0) {
      prev = true;
    }
    return prev;
  }, false);

  const changeDay = (direction: "prev" | "next" = "next") => {
    let addValue = direction === "next" ? 1 : -1;

    dispatch(updateDayDialongTargetDay({ days: addValue }));
  };

  useKeyPress("ArrowLeft", window, () => changeDay("prev"));
  useKeyPress("ArrowRight", window, () => changeDay("next"));

  return (
    <>
      {/* ------ Header ------ */}
      <div className=" hidden h-[3.25rem] items-center justify-between border-b bg-gray-50 px-5 dark:bg-gray-100 sm2:flex sm2:h-[3rem] sm2:px-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              changeDay("prev");
            }}
            className="flex aspect-square w-[2.25rem] items-center  justify-center rounded-md border border-gray-300 hover:bg-gray-100 active:bg-gray-200 sm2:w-[2rem]"
          >
            <BiChevronLeft size={23} className="text-gray-600" />
          </button>

          <button
            onClick={() => {
              changeDay("next");
            }}
            className="flex aspect-square w-[2.25rem] items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 active:bg-gray-200 sm2:w-[2rem]"
          >
            <BiChevronRight size={23} className="text-gray-600" />
          </button>
        </div>

        <button className="hidden items-center sm2:flex" onClick={onClose} ref={ref}>
          <IoMdClose
            size={19}
            className="hidden text-gray-600 hover:text-rose-500 sm2:inline-block"
          />
          {/* <PiCaretDownBold
            size={22}
            className="sm2:hidden text-gray-500 hover:text-rose-500"
          /> */}
        </button>
      </div>

      {/* ------ Body ------ */}
      <div className="__scrollbar-xs my-[0.1rem] mr-[0.15rem] flex-1 px-5 pb-2 pr-4">
        {/* Western date */}
        <div className="flex items-center justify-between">
          <time
            dateTime={format(selectedDay, "yyyy-MM-dd")}
            className="flex h-[2.5rem] items-center gap-2"
          >
            <span className="text-[1.25rem] text-gray-500 dark:text-gray-700">
              {format(selectedDay, "iii,")}
            </span>
            <span className="text-[1.25rem] font-semibold text-rose-500">
              {format(selectedDay, "d ")}
            </span>
            <span className="text-[1.25rem] text-gray-500 dark:text-gray-700 ">
              {format(selectedDay, "MMMM yyyy")}
            </span>
          </time>
          {dayIsToday && (
            <span className=" rounded-md  border border-green-400 px-[0.35rem] py-[0.15rem] text-[0.85rem] text-green-600">
              Today
            </span>
          )}
        </div>
        {/* MM Date */}
        <div className="flex justify-between px-3">
          <time
            dateTime={format(selectedDay, "yyyy-MM-dd")}
            className=" flex flex-col text-gray-700"
          >
            <span className="mb-4 flex items-center pl-[0.1rem] text-[3rem] font-semibold leading-[4rem] text-rose-500">
              {engToMyanmarNumber(mmDate.date)}
            </span>
            <span className="mb-1 font-semibold text-gray-500 dark:text-gray-700">
              {mmDate.day}
            </span>
            <span>
              <span className=" text-gray-500 dark:text-gray-700">
                {engToMyanmarNumber(mmDate.year)}
              </span>
              {" ခုနှစ်၊ "}
              <span>
                {mmDate.month}
                {mmDate.moonPhase}
              </span>
            </span>
          </time>
          {/* Moon */}
          <div className="pr-1">
            <div
              className={cn(
                "mt-[1.65rem] h-[2.5rem] w-[2.5rem] rounded-full  bg-none",
                mmDate.moonPhase === "လပြည့်" && "bg-rose-500",
                mmDate.moonPhase === "လကွယ်" && "bg-gray-700",
              )}
            />
          </div>
        </div>
        {/* Astrology Events */}
        {show.astroEvent && (
          <div className="mt-5">
            <div className="flex flex-wrap gap-[0.35rem]">
              {ASTRO_EVENT_LIST.map((event) => {
                let readEvent = mmDate[event];
                if (!readEvent) return null;
                if (event == "nakhat") readEvent = readEvent + "နက္ခတ်";
                if (event == "mahabote") readEvent = readEvent + "ဖွား";
                if (event == "nagahle")
                  readEvent = "နဂါးခေါင်း " + readEvent + "သို့လှည့်";

                return (
                  <span
                    key={event}
                    className="flex-shrink-0 rounded-sm border border-rose-500/50 p-2 pb-[0.285rem] pt-[0.19rem] text-[0.95rem] text-rose-600 dark:text-rose-500 sm2:text-sm"
                  >
                    {readEvent}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        {/* Events */}
        <div className="mt-5 flex-1 border-t border-gray-200 py-2">
          <h5 className="text-[1.05rem] font-medium text-gray-500 dark:text-gray-700">
            Events
          </h5>
          <ul className="mt-2 space-y-[0.25rem]">
            {checkedEvents.map((eventCalendar) => {
              return (
                <Fragment key={eventCalendar.id}>
                  {eventCalendar.events.map((event) => (
                    <li
                      key={event}
                      className="flex h-[2rem] items-center rounded-md px-2 text-[0.9rem] font-semibold"
                      style={{
                        backgroundColor: modifyColorOpacity(
                          eventCalendar.tagColor,
                          0.15,
                        ),
                        color: eventCalendar.tagColor,
                      }}
                    >
                      {event}
                    </li>
                  ))}
                </Fragment>
              );
            })}
            {!hasEvents && (
              <div className="flex h-[4rem] items-center justify-center text-[0.975rem] font-medium text-gray-400">
                No events
              </div>
            )}
          </ul>
        </div>
      </div>

      {/* ------ Footer ------ */}
      <div className=" flex h-[3.5rem] items-center justify-between border-t px-3 sm2:h-[3.75rem]">
        <div className="flex items-center gap-1 sm2:hidden">
          <button
            onClick={() => {
              changeDay("prev");
            }}
            className="flex aspect-square w-[2.25rem] items-center  justify-center rounded-md border border-gray-300 hover:bg-gray-100 active:bg-gray-200 sm2:w-[2rem]"
          >
            <BiChevronLeft size={23} className="text-gray-600" />
          </button>

          <button
            onClick={() => {
              changeDay("next");
            }}
            className="flex aspect-square w-[2.25rem] items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 active:bg-gray-200 sm2:w-[2rem]"
          >
            <BiChevronRight size={23} className="text-gray-600" />
          </button>
        </div>
        <Button
          disabled
          onClick={() => {
            onClose();
            dispatch(setNewEventDialongTargetDay(selectedDay.toISOString()));
          }}
          className="ml-auto text-gray-0"
          size="sm"
        >
          Add New Event
        </Button>
      </div>
    </>
  );
});

export default DayDialogContent;
