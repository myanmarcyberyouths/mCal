import { Button } from "@/components/ui/buttons/Button";
import {RootState} from "@/store";
import { PARAMS, SETTING_PARAMS } from "@/type-models/utils.type";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import {useSelector} from "react-redux";
import { useSearchParams } from "react-router-dom";

function SettingTrigger() {
  const enterMobileMode =  useSelector((state: RootState) => state.systemState.enterMobileMode)
  const [searchParam, setSearchParams] = useSearchParams();

  const handleTrigger = () => {
    if(enterMobileMode) {
      setSearchParams(`?${PARAMS.setting}=open`);
    } else {
      setSearchParams(`?${PARAMS.setting}=${SETTING_PARAMS.general}`);
    }
  };

  return (
    <Button
      onClick={handleTrigger}
      variant="ghost"
      size="icon"
      className="ml-2">
      <IoSettingsOutline
        size={22}
        className="text-gray-600"
      />
    </Button>
  );
}

export default SettingTrigger;
