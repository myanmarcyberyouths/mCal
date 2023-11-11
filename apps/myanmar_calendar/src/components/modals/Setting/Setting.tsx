import { PARAMS, SETTING_PARAMS } from "@/type-models/utils.type";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { VscSettings } from "react-icons/vsc";
import { BsLayoutSidebar } from "react-icons/bs";
import RenderIcon from "@/components/ui/render/RenderIcon";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";

const SETTING_ICONS = {
  [SETTING_PARAMS.general]: <VscSettings />,
  [SETTING_PARAMS.sidebar]: <BsLayoutSidebar />,
};

function Setting() {
  const [searchParam, setSearchParams] = useSearchParams();

  const settingParam = searchParam.get(PARAMS.setting);

  return (
    <div className="h-full flex items-stretch">
      <div className="w-[14rem]">
        <div className="flex items-center pl-4 h-[3rem] mb-1">
          <h3 className="text-[1.1rem] text-gray-500 font-semibold">Setting</h3>
        </div>
        <ul className=" space-y-[0.1rem]">
          {Object.values(SETTING_PARAMS).map((param) => {
            const isActive = settingParam === param;
            searchParam.set(PARAMS.setting, param);
            return (
              <li>
                <Link
                  to={{ search: `${searchParam.toString()}` }}
                  key={param}
                  className={cn("flex gap-2 items-center h-[2.1rem] mx-2 pl-2 rounded-sm hover:bg-gray-100 cursor-pointer capitalize", isActive && "bg-gray-200/70 hover:bg-gray-200/70")}>
                  <RenderIcon className={cn("text-gray-500", isActive && "text-gray-800")}>{SETTING_ICONS[param]}</RenderIcon>
                  <span className={cn("text-[0.85rem] text-gray-700/90 mt-[0.125rem]", isActive && "text-gray-800")}>{param}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-l border-gray-200 flex-1 flex flex-col items-stretch">
        <div className=" flex justify-between items-center px-3 h-[3rem] border-b border-gray-200">
          <h4 className="text-gray-600 font-medium capitalize">{settingParam}</h4>
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
        <div className=" flex-1 m-[0.15rem] mb-1 __scrollbar-xs mx-h-full"></div>
      </div>
    </div>
  );
}

export default Setting;
