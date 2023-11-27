import React, { Fragment } from "react";
import Setting from "./Setting";
import { useSearchParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import ModelBackdrop from "@/components/ui/backdrops/ModelBackdrop";
import { PARAMS, SETTING_PARAMS } from "@/type-models/utils.type";
import useKeyPress from "@/hooks/useKeyPress";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import BottomSheetMobile from "@/components/ui/sheets/BottomSheetMobile";

function RenderSetting() {
  const enterMobileMode =  useSelector((state: RootState) => state.systemState.enterMobileMode)
  const [searchParams, setSearchParams] = useSearchParams();
  const settingParam = searchParams.get(PARAMS.setting)

  const handlCloseSetting = () => {
    searchParams.delete(PARAMS.setting);
    setSearchParams(searchParams);
  };

  useKeyPress("Escape", handlCloseSetting);

if(enterMobileMode) return <SettingMobile isOpen={!!settingParam} onClose={handlCloseSetting} />

  return (
      <SettingDesktop show={!!settingParam} onClose={handlCloseSetting} />
  );
}

export default RenderSetting;


function SettingMobile({isOpen, onClose}: {isOpen: boolean,onClose: () => void}) {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const settingParam = searchParams.get(PARAMS.setting) as SETTING_PARAMS;
  
 return (
  <BottomSheetMobile isOpen={isOpen} onClose={onClose} >
    <Setting />
  </BottomSheetMobile>
 )
}

function  SettingDesktop({show, onClose}: {show: boolean, onClose: () => void}) {
   return (
     <Transition
     appear
     show={show}>
      {/* show={settingParam && SETTING_PARAMS[settingParam] ? true : false}> */}
      <Dialog
        as="div"
        className={"relative z-10"}
        onClose={() => {}}>
        <ModelBackdrop
          show={show}
          opacity="opacity-20 dark:opacity-40"
          onClick={onClose}
        />
        <Transition.Child
          as={Fragment}
          enterFrom={"opacity-5  translate-y-7"}
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo={"opacity-0  translate-y-5"}
          enter={" duration-200"}
          leave={"ease-in duration-150"}>
          <Dialog.Panel className={"fixed z-10 inset-0 m-auto w-[90%] h-[90%] max-w-[55rem] max-h-[40rem] rounded-lg overflow-hidden"}>
            <Setting />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
      </Transition>
      )
}