import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { FiMaximize2 } from "react-icons/fi";
import { Button } from "@/components/ui/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { setNewEventDialongTargetDay, updateDayDialongTargetDay } from "@/store/modelControlState";
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
import { getDayEvents } from "@/event_calendars/formatEvent";

export interface DayDialogContentProps {
  onClose: () => void;
  selectedDay: Date;
}

const DayDialogContent = ({ onClose, selectedDay }: DayDialogContentProps) => {
  const dispatch = useDispatch();
  const mmDate = englishToMyanmarDate(selectedDay);
  const { eventCalendars, show } = useSelector((state: RootState) => state.calendarState);
  const enterMobileMode = useSelector((state: RootState) => state.systemState.enterMobileMode);
  let dayIsToday = isToday(selectedDay);

  const checkedEvents = getDayEvents(
    selectedDay,
    eventCalendars.filter((calendar) => calendar.checked === true)
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

  useKeyPress("ArrowLeft", () => changeDay("prev"));
  useKeyPress("ArrowRight", () => changeDay("next"));

  return (
    <>
      {/* ------ Header ------ */}
      <div className=" h-[3.25rem] sm2:h-[3rem] sm2:flex hidden items-center justify-between px-5 sm2:px-3 bg-gray-50 dark:bg-gray-100 border-b">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              changeDay("prev");
            }}
            className="rounded-md w-[2.25rem] sm2:w-[2rem] aspect-square  border border-gray-300 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center">
            <BiChevronLeft
              size={23}
              className="text-gray-600"
            />
          </button>

          <button
            onClick={() => {
              changeDay("next");
            }}
            className="rounded-md w-[2.25rem] sm2:w-[2rem] aspect-square border border-gray-300 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center">
            <BiChevronRight
              size={23}
              className="text-gray-600"
            />
          </button>
        </div>

        <button
          className="hidden sm2:flex items-center"
          onClick={onClose}>
          <IoMdClose
            size={19}
            className="hidden sm2:inline-block text-gray-600 hover:text-rose-500"
          />
          {/* <PiCaretDownBold
            size={22}
            className="sm2:hidden text-gray-500 hover:text-rose-500"
          /> */}
        </button>
      </div>

      {/* ------ Body ------ */}
      <div className="flex-1 __scrollbar-xs px-5 pr-4 pb-2 mr-[0.15rem] my-[0.1rem]">
        {/* Western date */}
        <div className="flex justify-between items-center">
          <time
            dateTime={format(selectedDay, "yyyy-MM-dd")}
            className="flex items-center gap-2 h-[2.5rem]">
            <span className="text-[1.25rem] text-gray-500 dark:text-gray-700">{format(selectedDay, "iii,")}</span>
            <span className="text-[1.25rem] font-semibold text-rose-500">{format(selectedDay, "d ")}</span>
            <span className="text-[1.25rem] text-gray-500 dark:text-gray-700 ">{format(selectedDay, "MMMM yyyy")}</span>
          </time>
          {dayIsToday && <span className=" text-[0.85rem]  text-green-600 border border-green-400 rounded-md px-[0.35rem] py-[0.15rem]">Today</span>}
        </div>
        {/* MM Date */}
        <div className="flex justify-between px-3">
          <time
            dateTime={format(selectedDay, "yyyy-MM-dd")}
            className=" text-gray-700 flex flex-col">
            <span className="text-[3rem] leading-[4rem] mb-4 flex items-center text-rose-500 font-semibold pl-[0.1rem]">{engToMyanmarNumber(mmDate.date)}</span>
            <span className="mb-1 font-semibold text-gray-500 dark:text-gray-700">{mmDate.day}</span>
            <span>
              <span className=" text-gray-500 dark:text-gray-700">{engToMyanmarNumber(mmDate.year)}</span>
              {" ခုနှစ်၊ "}
              <span>
                {mmDate.month}
                {mmDate.moonPhase}
              </span>
            </span>
          </time>
          {/* Moon */}
          <div className="pr-1">
            <div className={cn("mt-[1.65rem] w-[2.5rem] h-[2.5rem] rounded-full  bg-none", mmDate.moonPhase === "လပြည့်" && "bg-rose-500", mmDate.moonPhase === "လကွယ်" && "bg-gray-700")} />
          </div>
        </div>
        {/* Astrology Events */}
        {show.astroEvent && (
          <div className="mt-5">
            <div className="flex gap-[0.35rem] flex-wrap">
              {ASTRO_EVENT_LIST.map((event) => {
                let readEvent = mmDate[event];
                if (!readEvent) return null;
                if (event == "nakhat") readEvent = readEvent + "နက္ခတ်";
                if (event == "mahabote") readEvent = readEvent + "ဖွား";
                if (event == "nagahle") readEvent = "နဂါးခေါင်း " + readEvent + "သို့လှည့်";

                return (
                  <span
                    key={event}
                    className="flex-shrink-0 p-2 pb-[0.285rem] pt-[0.19rem] border border-rose-500/50 text-[0.95rem] sm2:text-sm text-rose-600 dark:text-rose-500 rounded-sm">
                    {readEvent}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        {/* Events */}
        <div className="flex-1 py-2 mt-5 border-t border-gray-200">
          <h5 className="font-medium text-[1.05rem] text-gray-500 dark:text-gray-700">Events</h5>
          <ul className="mt-2 space-y-[0.25rem]">
            {checkedEvents.map((eventCalendar) => {
              return (
                <Fragment key={eventCalendar.id}>
                  {eventCalendar.events.map((event) => (
                    <li
                      key={event}
                      className="flex items-center rounded-md h-[2rem] px-2 font-semibold text-[0.9rem]"
                      style={{
                        backgroundColor: modifyColorOpacity(eventCalendar.tagColor, 0.15),
                        color: eventCalendar.tagColor,
                      }}>
                      {event}
                    </li>
                  ))}
                </Fragment>
              );
            })}
            {!hasEvents && <div className="flex justify-center items-center h-[4rem] text-[0.975rem] text-gray-400 font-medium">No events</div>}
          </ul>
        </div>
      </div>

      {/* ------ Footer ------ */}
      <div className=" h-[3.5rem] sm2:h-[3.75rem] border-t flex items-center justify-between px-3">
        <div className="flex sm2:hidden items-center gap-1">
          <button
            onClick={() => {
              changeDay("prev");
            }}
            className="rounded-md w-[2.25rem] sm2:w-[2rem] aspect-square  border border-gray-300 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center">
            <BiChevronLeft
              size={23}
              className="text-gray-600"
            />
          </button>

          <button
            onClick={() => {
              changeDay("next");
            }}
            className="rounded-md w-[2.25rem] sm2:w-[2rem] aspect-square border border-gray-300 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center">
            <BiChevronRight
              size={23}
              className="text-gray-600"
            />
          </button>
        </div>
        <Button
          disabled
          onClick={() => {
            onClose();
            dispatch(setNewEventDialongTargetDay(selectedDay.toISOString()));
          }}
          className="ml-auto text-gray-0"
          size="sm">
          Add New Event
        </Button>
      </div>
    </>
  );
};

export default DayDialogContent;
