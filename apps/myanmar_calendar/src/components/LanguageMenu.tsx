import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon, LanguageIcon} from "@heroicons/react/20/solid";
import {classNames} from "../utils/classNames";
import {i18n} from "burma-calendar";

export type Language = Parameters<typeof i18n>[1]

interface LanguageMenuProps {
    selectedLanguage: Language;
    onLanguageChange: (language: Language) => void;
}

const LanguageMenu = ({
                          selectedLanguage,
                          onLanguageChange,
                      }: LanguageMenuProps) => {
    return (
        <Menu as="div" className="relative">
            <Menu.Button
                type="button"
                className="capitalize flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                <LanguageIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                {selectedLanguage as any}
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({active}) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => onLanguageChange("myanmar")}
                                >
                                    Myanmar
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => onLanguageChange("english")}
                                >
                                    English
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => onLanguageChange("mon")}
                                >
                                    Mon
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <a
                                    href="#"
                                    onClick={() => onLanguageChange("karen")}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Karen
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => onLanguageChange("shan")}
                                >
                                    Shan
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default LanguageMenu;
