import React, { useMemo, useState } from "react";
import SettingSectionContainer from "../SettingSectionContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/selectBoxes/Select";
import { BiCaretDown, BiChevronDown } from "react-icons/bi";
import { WEEK_DAYS } from "@/type-models/utils.type";
import { cn } from "@/lib/utils";
import { TIME_ZONES } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTimeZone, setWeekStart } from "@/store/calendarState";

const timeZones = Intl.supportedValuesOf("timeZone");

function DateTimeSetting() {
  const dispatch = useDispatch();
  const { timeZone, weekStart } = useSelector((state: RootState) => state.calendarState);
  const [timeFormat, setTimeFormat] = useState("13:00");

  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(localTimeZone);

  return (
    <SettingSectionContainer
      label="Date & Time"
      bottomBorder={false}>
      <li className="flex justify-between max-w-[28rem] items-center p-2 px-2 border-b border-gray-200">
        <div>
          <span className="text-[0.925rem] text-gray-600">Time zone</span>
        </div>
        {/* Using defaut <select> instead of Radix's select as Radix has performance issue when mapping big arrays  */}
        <div className="group/select relative flex items-center overflow-hidden rounded-sm cursor-pointer">
          <select
            id="mySelect"
            value={timeZone}
            onChange={(e) => dispatch(setTimeZone(e.target.value))}
            className="w-[14rem] h-input-md px-2 rounded-sm bg-gray-100 dark:bg-gray-200 group-hover/select:bg-gray-150 dark:group-hover/select:bg-gray-250 cursor-pointer text-[0.9rem] text-gray-800 font-light outline-none">
            <option value="">-- Select --</option>
            {timeZones.map((zone) => (
              <option
                key={zone}
                value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <div
            aria-hidden="true"
            className="absolute right-0 w-[1.15rem] bg-gray-100 dark:bg-gray-200 group-hover/select:bg-gray-150 dark:group-hover/select:bg-gray-250 flex items-center self-stretch h-full pointer-events-none">
            <BiCaretDown
              size={13}
              className="text-gray-500"
            />
          </div>
        </div>
      </li>

      <SettingSelectBox
        label="Week start"
        options={Object.values(WEEK_DAYS)}
        value={weekStart}
        selectContentWidth="w-[9rem]"
        selectHandler={(value: WEEK_DAYS) => dispatch(setWeekStart(value))}
      />
      <SettingSelectBox
        label="Time format"
        options={["13:00", "1:00 pm"]}
        value={timeFormat}
        selectHandler={setTimeFormat}
        selectContentWidth="w-[7.5rem]"
      />
    </SettingSectionContainer>
  );
}

export default DateTimeSetting;

function SettingSelectBox<T>({
  label,
  value,
  options,
  selectContentWidth,
  selectHandler,
}: {
  label: string;
  options: string[];
  value: string;
  selectContentWidth?: string;
  selectHandler: (value: string) => void;
}) {
  return (
    <li className="flex justify-between max-w-[28rem] items-center p-2 px-2 border-b border-gray-200">
      <div>
        <span className="text-[0.925rem] text-gray-600">{label}</span>
      </div>
      <Select
        value={value}
        onValueChange={selectHandler}>
        <SelectTrigger
          config={{
            size: "lg",
          }}
          className="h-input-md min-w-[7.5rem] w-fit gap-1  border-none bg-gray-100 dark:bg-gray-200 hover:bg-gray-150 dark:hover:bg-gray-250 pl-2.5 pr-1.5">
          <span className="flex gap-2 w-full items-center text-[0.9rem] text-gray-800 font-light">
            <SelectValue placeholder={label} />
          </span>

          <BiCaretDown className="text-gray-500" />
        </SelectTrigger>
        <SelectContent
          className={cn("w-[8rem] mt-[0.1rem] pl-0 pr-[0.1rem]", selectContentWidth)}
          align="end">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="pl-2 rounded-none">
              <p className=" first-letter:capitalize">{option}</p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </li>
  );
}
