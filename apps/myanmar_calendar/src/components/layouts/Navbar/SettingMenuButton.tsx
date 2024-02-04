import { Button } from "@/components/ui/buttons/Button";
import { RootState } from "@/store";
import { PARAMS, SETTING_PARAMS } from "@/type-models/utils.type";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SettingMenuButton() {
  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );
  const [searchParam, setSearchParams] = useSearchParams();

  const handleTrigger = () => {
    if (enterMobileMode) {
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
      className="hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-lg border border-gray-300 px-2 py-1 text-sm font-medium transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
    >
      <IoSettingsOutline size={16} className="text-gray-700" />
    </Button>
  );
}

export default SettingMenuButton;
