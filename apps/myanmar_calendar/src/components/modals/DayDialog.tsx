import React, {Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {format} from "date-fns";
import {englishToMyanmarDate} from 'burma-calendar'
import {engToMyanmarNumber} from "../../utils/engToMyanmarNumber";

interface DayDialogProps {
    isOpen: boolean
    onClose: () => void;
    selectedDay: Date;
}

const DayDialog = ({
                       isOpen,
                       onClose,
                       selectedDay,
                   }: DayDialogProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                {/*<Dialog.Title*/}
                                {/*    as="h3"*/}
                                {/*    className="text-lg font-medium leading-6 text-gray-900"*/}
                                {/*>*/}
                                {/*    {format(selectedDay, "MMMM do")}*/}
                                {/*</Dialog.Title>*/}
                                <div className="relative mt-2">
                                    <div
                                        className="bg-indigo-500 flex flex-col text-sm text-gray-50 md:py-32 rounded-3xl">
                                        <p className="absolute top-0 right-0 px-4 pt-4 font-semibold text-lg">
                                            {format(selectedDay, "d MMMM yyyy")}
                                        </p>
                                        <div
                                            className="place-self-center flex gap-y-6 flex-col items-center justify-center">
                                            <p className="text-5xl">
                                                {engToMyanmarNumber(englishToMyanmarDate(selectedDay.toDateString()).date)}
                                            </p>
                                            <div className="flex gap-x-1 mt-1 text-lg">
                                                <p>{englishToMyanmarDate(selectedDay.toDateString()).month}</p>
                                                <p>{englishToMyanmarDate(selectedDay.toDateString()).moonPhase}</p>
                                            </div>
                                            <p className="-mt-3 text-sm">{engToMyanmarNumber(englishToMyanmarDate(selectedDay.toDateString()).year)}</p>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    );
};

export default DayDialog;
