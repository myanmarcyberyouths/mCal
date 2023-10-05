import { BsCalendar2Check } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";

function HeaderLogoMenu() {
  return (
    <div className="flex-shrink-0 flex items-stretch gap-6 pl-3  w-[17rem]">
      <button className="text-gray-600 hover:text-gray-900">
        <IoMdMenu size={28} />
      </button>
      <div className="flex items-center gap-3">
        {/* Logo placeholder */}
        <BsCalendar2Check
          size={32}
          className="text-yellow-500"
        />
        <h1 className="text-[1.8rem] text-gray-500">Calendar</h1>
      </div>
    </div>
  );
}

export default HeaderLogoMenu;
