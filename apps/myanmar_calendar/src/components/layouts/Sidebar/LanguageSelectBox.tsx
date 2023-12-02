import { RootState } from "@/store";
import { setCalendarLanguage } from "@/store/calendarState";
import { Language } from "@/type-models/calendarState.type";
import { LANGUAGES } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

interface LanguageMenuProp {
  language: Language;
  onClick: (language: Language) => void;
}

function LanguageMenu({ language, onClick }: LanguageMenuProp) {
  return (
    <>
      <Menu
        as="div"
        className="relative inline-block w-full text-left"
        style={{
          zIndex: 100,
        }}
      >
        <div>
          <Menu.Button className="inline-flex w-full  justify-between  rounded-md px-4 py-2 text-sm font-medium capitalize text-gray-500  ring-1 ring-gray-250 hover:bg-gray-50 focus:outline-none">
            {language}
            <ChevronDownIcon className="-mr-1  h-5 w-5 text-gray-400" />
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
          <Menu.Items className="absolute mt-2  w-56 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-gray-0 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-75">
            <div className="px-1 py-1">
              {Object.keys(LANGUAGES).map((language) => (
                <Menu.Item key={language}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-600" : "text-gray-700"
                      }  group flex w-full items-center rounded-md px-2 py-2.5 text-sm capitalize`}
                      onClick={() => onClick(language as Language)}
                    >
                      <span className=" text-[0.8rem] capitalize text-gray-600">
                        {language}
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

export function CalendarLanguageMenu() {
  const dispatch = useDispatch();

  const selectedCalendarLanguage = useSelector(
    (state: RootState) => state.calendarState.calendarLanguage,
  );

  return (
    <LanguageMenu
      language={selectedCalendarLanguage}
      onClick={(language) => dispatch(setCalendarLanguage(language))}
    />
  );
}
