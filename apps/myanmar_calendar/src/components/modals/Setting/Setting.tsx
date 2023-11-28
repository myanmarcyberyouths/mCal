import { PARAMS, SETTING_PARAMS } from "@/type-models/utils.type";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef } from "react";
import { VscSettings } from "react-icons/vsc";
import { BsLayoutSidebar } from "react-icons/bs";
import RenderIcon from "@/components/ui/render/RenderIcon";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";
import GeneralSettings from "./SettingGroups/GeneralSettings";
import SidebarSettings from "./SettingGroups/SidebarSettings";
import {Button} from "@/components/ui/buttons/Button";
import {FaAngleRight, FaArrowLeft, FaChevronLeft} from "react-icons/fa";
import {HiOutlineChevronRight} from "react-icons/hi2";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {AnimatePresence, motion} from "framer-motion";

const SETTING_ICONS = {
  [SETTING_PARAMS.general]: <VscSettings />,
  [SETTING_PARAMS.sidebar]: <BsLayoutSidebar />,
};

const SETTING_GROUPS = {
  general: <GeneralSettings />,
  sidebar: <SidebarSettings />,
};

const Setting = React.forwardRef((props, ref: React.MutableRefObject<HTMLElement>) => {
  const enterMobileMode =  useSelector((state: RootState) => state.systemState.enterMobileMode)
  const [searchParam, setSearchParams] = useSearchParams();
  const settingParam = searchParam.get(PARAMS.setting) as SETTING_PARAMS;
  
  console.log(settingParam)
  return (
    <div className="h-full flex items-stretch relative shadow-model dark:shadow-model-dark bg-gray-0  dark:bg-gray-100">
      <div className="w-full sm2:w-[14rem]">
          <div className="flex items-center pl-4 h-[3rem] mb-2">
          <h2 className="text-[1.1rem] text-gray-400 dark:text-gray-500 font-semibold">Setting</h2>
        </div>
        <ul className=" sm2:space-y-[0.1rem] rounded-lg bg-gray-50 sm2:dark:bg-gray-100 mx-4 sm2:mx-0 overflow-hidden">
          {Object.values(SETTING_PARAMS).map((param) => {
            const isActive = settingParam === param;
            // searchParam.set(PARAMS.setting, param);
            return (
              <li key={param} className="sm2:px-2">
                <a
                  key={param}
                  onClick={(e) => {
                    e.preventDefault()
                    searchParam.set(PARAMS.setting, param);
                    setSearchParams(searchParam)
                  }}
                  className={cn(
                    "flex justify-between items-center h-[3rem] sm2:h-[2.1rem] px-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer capitalize border-b border-gray-150/80 sm2:border-none",
                    isActive && "bg-gray-200/70 dark:bg-gray-250 hover:bg-gray-200/70 dark:hover:bg-gray-250"
                  )}>
                    <span className="flex gap-3 ms2:gap-2 items-center">
                      <RenderIcon className={cn("text-[1.2rem] sm2:text-[1rem] text-gray-500", isActive && "text-gray-800")}>{SETTING_ICONS[param]}</RenderIcon>
                      <span className={cn("text-[1.05rem] sm2:text-[0.85rem] text-gray-700/90 dark:text-gray-700 mt-[0.125rem]", isActive && "text-gray-800 dark:text-gray-900")}>{param}</span>
                    </span>
                    <HiOutlineChevronRight size={18} className="sm2:hidden text-gray-500" />
                </a>
                {/* <Link
                  to={{ search: `${searchParam.toString()}` }}
                  key={param}
                  className={cn(
                    "flex justify-between items-center h-[3rem] sm2:h-[2.1rem] px-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer capitalize border-b border-gray-150/80 sm2:border-none",
                    isActive && "bg-gray-200/70 dark:bg-gray-250 hover:bg-gray-200/70 dark:hover:bg-gray-250"
                  )}>
                    <span className="flex gap-3 ms2:gap-2 items-center">
                      <RenderIcon className={cn("text-[1.2rem] sm2:text-[1rem] text-gray-500", isActive && "text-gray-800")}>{SETTING_ICONS[param]}</RenderIcon>
                      <span className={cn("text-[1.05rem] sm2:text-[0.85rem] text-gray-700/90 dark:text-gray-700 mt-[0.125rem]", isActive && "text-gray-800 dark:text-gray-900")}>{param}</span>
                    </span>
                    <HiOutlineChevronRight size={18} className="sm2:hidden text-gray-500" />
                </Link> */}
              </li>
            );
          })}
        </ul>
      </div>
      {/* <Transition as={Fragment} appear={enterMobileMode}
        show={SETTING_PARAMS[settingParam] ? true : false }
      >
        <Transition.Child as="div"
         enterFrom={" translate-x-[100%]"}
          enterTo="translate-x-0"
          leaveFrom="translate-x-0"
          leaveTo={" translate-x-[100%]"}
          enter={" duration-300"}
          leave={"duration-300"}
        className="absolute w-full h-full sm2:w-auto sm2:static  border-l border-gray-200 dark:border-gray-250 flex-1 flex flex-col items-stretch bg-gray-0  dark:bg-gray-100"
        > */}
      <AnimatePresence initial={enterMobileMode}>
      {!!SETTING_PARAMS[settingParam] &&  <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ bounce: false }}
          className="absolute w-full h-full sm2:w-auto sm2:static  border-l border-gray-200 dark:border-gray-250 flex-1 flex flex-col items-stretch bg-gray-0  dark:bg-gray-100"     
        >
          <div className=" flex justify-between items-center px-3 pl-2 sm2:pl-3 mb-1 sm2:mb-0 h-[2rem] sm2:h-[3rem] sm2:border-b border-gray-200 dark:border-gray-250">
            <div className="flex items-center w-full sm2:width-auto">
              <div className="flex-1 sm2:hidden ">

              <Button variant="secondary" onClick={() =>{ 
                searchParam.set(PARAMS.setting, 'open')
              setSearchParams(searchParam)
                }
              }
              className="flex items-center gap-[0.15rem] text-rose-500 px-2 pl-1 hover:text-rose-600 "
              >
                {/* <FaArrowLeft size={20} /> */}
                <FaChevronLeft size={20} />
              </Button>
                </div>
              <h3 className="text-[1.05rem] text-gray-500 sm2:text-gray-700 font-medium capitalize">{settingParam}</h3>
              <div aria-hidden='true' className="flex-1" />
            </div>
            <button
              className="flex items-center"
              onClick={() => {
                searchParam.delete(PARAMS.setting);
                setSearchParams(searchParam);
              }}>
              <IoMdClose
                size={19}
                className="hidden sm2:inline-block text-gray-600 hover:text-rose-500"
              />
            </button>
          </div>
          <div ref={ref} className="flex-1 pb-2 px-3 sm2:px-2 pr-3 m-[0.15rem] space-y-6 mb-1 __scrollbar-xs mx-h-full">{SETTING_GROUPS[settingParam]}</div>
        </motion.div>}
      </AnimatePresence>

        {/* </Transition.Child>
      </Transition> */}
    </div>
  );
})

export default Setting;
