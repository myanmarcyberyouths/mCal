import React from "react";
import { camelToSentenceCase } from "@/utils/stringHelpers";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";

interface CheckListInterface {
  title: string;
  children: React.ReactNode;
}

export function CheckList({ title, children }: CheckListInterface) {
  return (
    <div className="">
      <p className="text-[0.75rem] font-medium text-cgray-500 mb-[0.35rem]">{title}</p>
      <ul>{children}</ul>
    </div>
  );
}

export function CheckListItem({ tagColor, ...props }: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { tagColor?: string }) {
  return (
    <li>
      <label
        htmlFor={props.id}
        className="flex items-center gap-3 h-[2.5rem] sm2:h-[1.95rem] rounded-[0.25rem] cursor-pointer hover:bg-cgray-100 px-2">
        <div className="relative flex items-center justify-center">
          <input
            {...props}
            type="checkbox"
            className=" w-[1.25rem] h-[1.25rem] sm2:w-[1.1rem] sm2:h-[1.1rem] appearance-none checked:bg-red-400 border-[1.8px] border-red-400 rounded-[0.15rem] cursor-pointer outline-none"
            style={{
              backgroundColor: props.checked ? tagColor : "white",
              borderColor: tagColor,
            }}
          />
          <IoMdCheckmark
            size={17}
            className="absolute text-cgray-0 "
          />
        </div>
        <span className=" text-[1.1rem] sm2:text-[0.875rem] first-letter:capitalize font-normal text-cgray-600 whitespace-nowrap">{props.name}</span>
      </label>
    </li>
  );
}

export function CheckListAddButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      disabled
      className={cn(
        "flex w-full items-center justify-center h-[2.25rem] sm2:h-[2rem]  xl:h-[1.85rem] rounded-[0.25rem] cursor-not-allowed text-cgray-500 font-medium text-[0.825rem] bg-cgray-200/80 hover:bg-cgray-200 active:bg-cgray-300/80",
        className
      )}>
      {children}
    </button>
  );
}
