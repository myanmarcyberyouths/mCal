import { Button } from "@/components/ui/buttons/Button";
import { PARAMS, SETTING_PARAMS } from "@/type-models/utils.type";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

function SettingTrigger() {
  const [searchParam, setSearchParams] = useSearchParams();

  const handleTrigger = () => {
    setSearchParams(`?${PARAMS.setting}=${SETTING_PARAMS.general}`);
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
