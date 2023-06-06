import {useEffect} from "react";

interface IKeyDown {
    onArrowLeftClick: () => void;
    onArrowRightClick: () => void;
}

export const useKeyDown = ({
                               onArrowLeftClick,
                               onArrowRightClick,
                           }: IKeyDown) => {
    useEffect(() => {
        const keyDownHandler = (e) => {
            switch (e.code) {
                case "ArrowRight":
                    return onArrowRightClick();
                case "ArrowLeft":
                    return onArrowLeftClick();
            }
            // console.log(`You pressed ${e.code}.`);
        }
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [onArrowLeftClick,onArrowRightClick]);

}
