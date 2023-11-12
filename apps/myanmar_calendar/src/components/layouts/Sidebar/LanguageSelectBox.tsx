import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectBoxes/Select";
import { RootState } from "@/store";
import { setCalendarLanguage } from "@/store/calendarState";
import { LANGUAGE_ENUM } from "@/type-models/calendarState.type";
import { LANGUAGES } from "@/utils/constants";
import { BiChevronDown } from "react-icons/bi";
import { HiLanguage } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

interface LanguageSelectBoxInterface {
  value: LANGUAGE_ENUM;
  onChange: (value: LANGUAGE_ENUM) => void;
}

function LanguageSelectBox({ value, onChange }: LanguageSelectBoxInterface) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        config={{
          size: "lg",
        }}
        className="h-input-md"
      >
        <span className="flex gap-2 w-full items-center text-[0.9rem] text-gray-500">
          <HiLanguage size={18} className="text-gray-600" />
          <SelectValue placeholder={value} />
        </span>
        <BiChevronDown size={27} className="text-gray-400 " />
      </SelectTrigger>
      <SelectContent className="w-[15rem]">
        {Object.values(LANGUAGES).map((language) => (
          <SelectItem
            key={language.label}
            value={language.label}
            showIndicator={true}
          >
            <span className="capitalize">{language.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageSelectBox;

export function CalendarLanguageSelectBox() {
  const dispatch = useDispatch();
  const calendarLanguage = useSelector(
    (state: RootState) => state.calendarState.calendarLanguage,
  );

  console.log(calendarLanguage);
  return (
    <LanguageSelectBox
      value={calendarLanguage}
      onChange={(value) => dispatch(setCalendarLanguage(value))}
    />
  );
}
// export function SystemLanguageSelectBox() {
//   return <LanguageSelectBox  />;
// }
