import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/selectBoxes/PrimarySelect";
import { LANGUAGES } from "@/utils/constants";
import { BiChevronDown } from "react-icons/bi";
import { HiLanguage } from "react-icons/hi2";

function LanguageSelectBox() {
  return (
    <Select value={"english"}>
      <SelectTrigger
        config={{
          size: "lg",
        }}
        className="h-input-md">
        <span className="flex gap-2 w-full items-center">
          <HiLanguage
            size={21}
            className="text-gray-500"
          />
          <SelectValue />
        </span>
        <BiChevronDown
          size={27}
          className="text-gray-400 "
        />
      </SelectTrigger>
      <SelectContent className="w-[15rem]">
        {Object.values(LANGUAGES).map((language) => (
          <SelectItem
            key={language.label}
            value={language.label}
            showIndicator={true}>
            <span className="capitalize">{language.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageSelectBox;
