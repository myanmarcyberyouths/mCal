import {
  CheckList,
  CheckListAddButton,
  CheckListItem,
} from "@/components/ui/lists/CheckList";
import { RootState } from "@/store";
import { updateEventCalendars } from "@/store/calendarState";
import {
  LOCAL_STORAGE_KEYS,
  PARAMS,
  SETTING_PARAMS,
} from "@/type-models/utils.type";
import { setLocalStorage } from "@/utils/helpers";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpenState } from "@/store/systemState";

function EventCalendarList() {
  const dispatch = useDispatch();
  const eventCalendars = useSelector(
    (state: RootState) => state.calendarState.eventCalendars,
  );
  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCheck = (checked, id: string) => {
    dispatch(
      updateEventCalendars({
        id,
        checked,
      }),
    );

    setLocalStorage(
      LOCAL_STORAGE_KEYS.eventCalendars,
      eventCalendars.map((calendar) => {
        if (calendar.id === id) return { ...calendar, checked };
        return calendar;
      }),
    );
  };

  return (
    <CheckList title="My Calendars">
      {eventCalendars.map(({ id, name, checked, tagColor }) => (
        <CheckListItem
          key={id}
          name={name}
          id={id + name}
          checked={checked}
          onChange={(e) => handleCheck(e.target.checked, id)}
          tagColor={tagColor}
        />
      ))}
      <div className="mt-1">
        <CheckListAddButton
          onClick={() => {
            if (enterMobileMode) {
              console.log(location.pathname);
              navigate(location.pathname, {
                state: { animate: "none" },
              });
              dispatch(setSidebarOpenState(false));
            }
            setSearchParams(
              `?${PARAMS.setting}=${SETTING_PARAMS.sidebar}&${PARAMS.transition}=0`,
            );
          }}
          className="gap-0"
        >
          More
        </CheckListAddButton>
      </div>
    </CheckList>
  );
}

export default EventCalendarList;
