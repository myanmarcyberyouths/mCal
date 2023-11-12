import React, { Fragment } from "react";
import Setting from "./Setting";
import { useSearchParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import ModelBackdrop from "@/components/ui/backdrops/ModelBackdrop";
import { PARAMS } from "@/type-models/utils.type";
import useKeyPress from "@/hooks/useKeyPress";

function RenderSetting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const settingParam = searchParams.get(PARAMS.setting);

  const handlCloseSetting = () => {
    searchParams.delete(PARAMS.setting);
    setSearchParams(searchParams);
  };

  useKeyPress("Escape", handlCloseSetting);

  return (
    <Transition
      appear
      show={settingParam ? true : false}>
      <Dialog
        as="div"
        className={"relative z-10"}
        onClose={() => {}}>
        <ModelBackdrop
          show={settingParam ? true : false}
          opacity="opacity-20 dark:opacity-40"
          onClick={handlCloseSetting}
        />
        <Transition.Child
          as={Fragment}
          enterFrom={"opacity-5  translate-y-7"}
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo={"opacity-0  translate-y-5"}
          enter={" duration-200"}
          leave={"ease-in duration-150"}>
          <Dialog.Panel className={"fixed z-10 inset-0 m-auto w-[90%] h-[90%] max-w-[55rem] max-h-[40rem] rounded-lg bg-gray-0 shadow-model dark:shadow-model-dark dark:bg-gray-100"}>
            <Setting />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default RenderSetting;
