import { RootState } from "@/store";
import { setCalendarMode } from "@/store/calendarState";
import { CalendarMode } from "@/type-models/calendarState.type";
import { CALENDAR_MODES } from "@/utils/constants";
import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function CalendarModeDropDown() {
  const dispatch = useDispatch();

  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );
  const calendarMode = useSelector(
    (state: RootState) => state.calendarState.calendarMode,
  );

  const onCalendarModeChange = useCallback(
    (mode: CalendarMode) => {
      dispatch(setCalendarMode(mode));
    },
    [dispatch],
  );

  useEffect(() => {
    if (enterMobileMode) onCalendarModeChange(CalendarMode.YEAR);
  }, [enterMobileMode, onCalendarModeChange]);

  if (enterMobileMode) return null;

  return (
    <>
      <Menu
        as="div"
        className="relative inline-block text-left"
        style={{
          zIndex: 10,
        }}
      >
        <div>
          <Menu.Button className="inline-flex  w-full justify-center  rounded-md px-4 py-2 text-sm font-medium capitalize text-gray-500  ring-1 ring-gray-250 hover:bg-gray-50 focus:outline-none">
            {/* Selected Calendar Mode */}
            {CALENDAR_MODES[calendarMode]}
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-400" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-0 dark:bg-gray-75 shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              {Object.keys(CALENDAR_MODES).map((key) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-600" : "text-gray-700"
                      }  group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                      onClick={() => onCalendarModeChange(key as CalendarMode)}
                    >
                      {CALENDAR_MODES[key]}
                      <span className="ml-auto text-[0.8rem] capitalize text-gray-500/90">
                        {key}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default CalendarModeDropDown;
