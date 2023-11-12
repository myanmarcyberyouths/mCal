import { PARAMS, SETTING_PARAMS } from "@/type-models/utils.type";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { VscSettings } from "react-icons/vsc";
import { BsLayoutSidebar } from "react-icons/bs";
import RenderIcon from "@/components/ui/render/RenderIcon";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";
import GeneralSettings from "./SettingGroups/GeneralSettings/GeneralSettings";
import SidebarSettings from "./SettingGroups/SidebarSettings/SidebarSettings";

const SETTING_ICONS = {
  [SETTING_PARAMS.general]: <VscSettings />,
  [SETTING_PARAMS.sidebar]: <BsLayoutSidebar />,
};

const SETTING_GROUPS = {
  general: <GeneralSettings />,
  sidebar: <SidebarSettings />,
};

function Setting() {
  const [searchParam, setSearchParams] = useSearchParams();

  const settingParam = searchParam.get(PARAMS.setting) as SETTING_PARAMS;

  return (
    <div className="h-full flex items-stretch">
      <div className="w-[14rem]">
        <div className="flex items-center pl-4 h-[3rem] mb-2">
          <h2 className="text-[1.1rem] text-gray-400 dark:text-gray-500 font-semibold">Setting</h2>
        </div>
        <ul className=" space-y-[0.1rem]">
          {Object.values(SETTING_PARAMS).map((param) => {
            const isActive = settingParam === param;
            searchParam.set(PARAMS.setting, param);
            return (
              <li key={param}>
                <Link
                  to={{ search: `${searchParam.toString()}` }}
                  key={param}
                  className={cn(
                    "flex gap-2 items-center h-[2.1rem] mx-2 pl-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer capitalize",
                    isActive && "bg-gray-200/70 dark:bg-gray-250 hover:bg-gray-200/70 dark:hover:bg-gray-250"
                  )}>
                  <RenderIcon className={cn("text-gray-500", isActive && "text-gray-800")}>{SETTING_ICONS[param]}</RenderIcon>
                  <span className={cn("text-[0.85rem] text-gray-700/90 dark:text-gray-700 mt-[0.125rem]", isActive && "text-gray-800 dark:text-gray-900")}>{param}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-l border-gray-200 dark:border-gray-250 flex-1 flex flex-col items-stretch">
        <div className=" flex justify-between items-center px-3 h-[3rem] border-b border-gray-200 dark:border-gray-250">
          <h3 className="text-[1.05rem] text-gray-700 font-medium capitalize">{settingParam}</h3>
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
        <div className="flex-1 pb-2 px-2 pr-3 m-[0.15rem] space-y-6 mb-1 __scrollbar-xs mx-h-full">{SETTING_GROUPS[settingParam]}</div>
      </div>
    </div>
  );
}

export default Setting;
