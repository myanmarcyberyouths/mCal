import { PARAMS, SETTING_PARAMS } from "@/type-models/utils.type";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef } from "react";
import { VscSettings } from "react-icons/vsc";
import { BsLayoutSidebar } from "react-icons/bs";
import RenderIcon from "@/components/ui/render/RenderIcon";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";
import GeneralSettings from "./SettingGroups/GeneralSettings";
import SidebarSettings from "./SettingGroups/SidebarSettings";
import { Button } from "@/components/ui/buttons/Button";
import { FaAngleRight, FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AnimatePresence, motion } from "framer-motion";

const SETTING_ICONS = {
  [SETTING_PARAMS.general]: <VscSettings />,
  [SETTING_PARAMS.sidebar]: <BsLayoutSidebar />,
};

const SETTING_GROUPS = {
  general: <GeneralSettings />,
  sidebar: <SidebarSettings />,
};

const Setting = React.forwardRef(
  (props, ref: React.MutableRefObject<HTMLElement>) => {
    const enterMobileMode = useSelector(
      (state: RootState) => state.systemState.enterMobileMode,
    );
    const [searchParam, setSearchParams] = useSearchParams();
    const settingParam = searchParam.get(PARAMS.setting) as SETTING_PARAMS;
    const transitionParam = searchParam.get(PARAMS.transition);

    console.log(settingParam);
    return (
      <div className="relative flex h-full items-stretch bg-gray-0 shadow-model dark:bg-gray-100  dark:shadow-model-dark">
        <div className="w-full sm2:w-[14rem]">
          <div className="mb-2 flex h-[3rem] items-center pl-4">
            <h2 className="text-[1.1rem] font-semibold text-gray-400 dark:text-gray-500">
              Setting
            </h2>
          </div>
          <ul className=" mx-4 overflow-hidden rounded-lg bg-gray-50 sm2:mx-0  sm2:space-y-[0.1rem] sm2:bg-gray-0 sm2:dark:bg-gray-100">
            {Object.values(SETTING_PARAMS).map((param) => {
              const isActive = settingParam === param;
              // searchParam.set(PARAMS.setting, param);
              return (
                <li key={param} className="sm2:px-2">
                  <a
                    key={param}
                    onClick={(e) => {
                      e.preventDefault();
                      searchParam.set(PARAMS.setting, param);
                      setSearchParams(searchParam);
                    }}
                    className={cn(
                      "flex h-[3rem] cursor-pointer items-center justify-between rounded-sm border-b border-gray-150/80 px-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-200 sm2:h-[2.1rem] sm2:border-none",
                      isActive &&
                        "bg-gray-200/70 hover:bg-gray-200/70 dark:bg-gray-250 dark:hover:bg-gray-250",
                    )}
                  >
                    <span className="ms2:gap-2 flex items-center gap-3">
                      <RenderIcon
                        className={cn(
                          "text-[1.2rem] text-gray-500 sm2:text-[1rem]",
                          isActive && "text-gray-800",
                        )}
                      >
                        {SETTING_ICONS[param]}
                      </RenderIcon>
                      <span
                        className={cn(
                          "mt-[0.125rem] text-[1.05rem] text-gray-700/90 dark:text-gray-700 sm2:text-[0.85rem]",
                          isActive && "text-gray-800 dark:text-gray-900",
                        )}
                      >
                        {param}
                      </span>
                    </span>
                    <HiOutlineChevronRight
                      size={18}
                      className="text-gray-500 sm2:hidden"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <AnimatePresence initial={enterMobileMode}>
          {!!SETTING_PARAMS[settingParam] && (
            <motion.div
              initial={{ x: transitionParam == "0" ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: enterMobileMode ? "100%" : 0 }}
              transition={{ bounce: false }}
              className="absolute flex h-full w-full flex-1  flex-col items-stretch border-l border-gray-200 bg-gray-0 dark:border-gray-250 dark:bg-gray-100 sm2:static  sm2:w-auto"
            >
              <div className=" mb-1 flex h-[2rem] items-center justify-between border-gray-200 px-3 pl-2 dark:border-gray-250 sm2:mb-0 sm2:h-[3rem] sm2:border-b sm2:pl-3">
                <div className="sm2:width-auto flex w-full items-center">
                  <div className="flex-1 sm2:hidden ">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        searchParam.set(PARAMS.setting, "open");
                        searchParam.delete(PARAMS.transition);
                        setSearchParams(searchParam);
                      }}
                      className="flex items-center gap-[0.15rem] px-2 pl-1 text-rose-500 hover:text-rose-600 "
                    >
                      <FaChevronLeft size={20} />
                    </Button>
                  </div>
                  <h3 className="text-[1.05rem] font-medium capitalize text-gray-500 sm2:text-gray-700">
                    {settingParam}
                  </h3>
                  <div aria-hidden="true" className="flex-1" />
                </div>
                <button
                  className="flex items-center"
                  onClick={() => {
                    searchParam.delete(PARAMS.setting);
                    setSearchParams(searchParam);
                  }}
                >
                  <IoMdClose
                    size={19}
                    className="hidden text-gray-600 hover:text-rose-500 sm2:inline-block"
                  />
                </button>
              </div>
              <div
                ref={ref}
                className="__scrollbar-xs mx-h-full m-[0.15rem] mb-1 flex-1 space-y-6 px-3 pb-2 pr-3 sm2:px-2"
              >
                {SETTING_GROUPS[settingParam]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

export default Setting;
