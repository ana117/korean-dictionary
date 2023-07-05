import Key from "./key";
import {useState} from "react";

const VirtualKeyboard = ({search, updateSearch, enterKey}) => {
    const [shift, setShift] = useState(false);
    const [capsLock, setCapsLock] = useState(false);

    const handleUpdateSearch = (newSearch) => {
        if (shift) {
            toggleShift();
        }
        updateSearch(newSearch);
    }
    const toggleShift = () => {
        setShift(!shift);
    }

    const toggleCapsLock = () => {
        setCapsLock(!capsLock);
    }

    const keyboardStates = {shift, capsLock, search};
    const handler = {handleUpdateSearch, toggleShift, toggleCapsLock, enterKey};

    const keys = [
        [
            {symbol: "`", altSymbol: "~", customClass: "hidden md:block"},
            {symbol: "1", altSymbol: "!"},
            {symbol: "2", altSymbol: "@"},
            {symbol: "3", altSymbol: "#"},
            {symbol: "4", altSymbol: "$"},
            {symbol: "5", altSymbol: "%"},
            {symbol: "6", altSymbol: "^"},
            {symbol: "7", altSymbol: "&"},
            {symbol: "8", altSymbol: "*"},
            {symbol: "9", altSymbol: "("},
            {symbol: "0", altSymbol: ")"},
            {symbol: "-", altSymbol: "_", customClass: "hidden md:block"},
            {symbol: "=", altSymbol: "+", customClass: "hidden md:block"},
            {symbol: "Backspace", altSymbol: "Backspace", customClass: "hidden md:block"}
        ],
        [
            {symbol: "Tab", altSymbol: "Tab", customClass: "hidden md:block"},
            {symbol: "ㅂ", altSymbol: "ㅃ"},
            {symbol: "ㅈ", altSymbol: "ㅉ"},
            {symbol: "ㄷ", altSymbol: "ㄸ"},
            {symbol: "ㄱ", altSymbol: "ㄲ"},
            {symbol: "ㅅ", altSymbol: "ㅆ"},
            {symbol: "ㅛ", altSymbol: ""},
            {symbol: "ㅕ", altSymbol: ""},
            {symbol: "ㅑ", altSymbol: ""},
            {symbol: "ㅐ", altSymbol: "ㅒ"},
            {symbol: "ㅔ", altSymbol: "ㅖ"},
            {symbol: "[", altSymbol: "{", customClass: "hidden md:block"},
            {symbol: "]", altSymbol: "}", customClass: "hidden md:block"},
            {symbol: "\\", altSymbol: "|", customClass: "hidden md:block"}
        ],
        [
            {symbol: "Caps Lock", altSymbol: "Caps Lock", customClass: "hidden md:block"},
            {symbol: "​", altSymbol: "1", customClass: "border-none hover:bg-white cursor-default md:hidden", customTextClass: "text-white"},
            {symbol: "ㅁ", altSymbol: ""},
            {symbol: "ㄴ", altSymbol: ""},
            {symbol: "ㅇ", altSymbol: ""},
            {symbol: "ㄹ", altSymbol: ""},
            {symbol: "ㅎ", altSymbol: ""},
            {symbol: "ㅗ", altSymbol: ""},
            {symbol: "ㅓ", altSymbol: ""},
            {symbol: "ㅏ", altSymbol: ""},
            {symbol: "ㅣ", altSymbol: ""},
            {symbol: ";", altSymbol: ":", customClass: "hidden md:block"},
            {symbol: "'", altSymbol: "\"", customClass: "hidden md:block"},
            {symbol: "Enter", altSymbol: "Enter", customClass: "hidden md:block"},
            {symbol: "​", altSymbol: "2", customClass: "border-none hover:bg-white cursor-default md:hidden", customTextClass: "text-white"},
        ],
        [
            {symbol: "LShift", altSymbol: "LShift", customClass: "hidden md:block"},
            {symbol: "⇧", altSymbol: "⇧", customClass: "md:hidden", customTextClass: "text-[2rem]"},
            {symbol: "ㅋ", altSymbol: ","},
            {symbol: "ㅌ", altSymbol: ""},
            {symbol: "ㅊ", altSymbol: ""},
            {symbol: "ㅍ", altSymbol: ""},
            {symbol: "ㅠ", altSymbol: ""},
            {symbol: "ㅜ", altSymbol: ""},
            {symbol: "ㅡ", altSymbol: "."},
            {symbol: ",", altSymbol: "<", customClass: "hidden md:block"},
            {symbol: ".", altSymbol: ">", customClass: "hidden md:block"},
            {symbol: "/", altSymbol: "?", customClass: "hidden md:block"},
            {symbol: "RShift", altSymbol: "RShift", customClass: "hidden md:block"},
            {symbol: "⌫", altSymbol: "⌫", customClass: "md:hidden", customTextClass: "text-[2rem]"},
        ],
        [
            {symbol: "LCtrl", altSymbol: "LCtrl", customClass: "hidden md:block"},
            {symbol: "⛭", altSymbol: "⛭", customClass: "md:hidden", customTextClass: "text-[2rem]"},
            {symbol: "Space", altSymbol: "Space"},
            {symbol: "RCtrl", altSymbol: "RCtrl", customClass: "hidden md:block"},
            {symbol: "⚲", altSymbol: "⚲", customClass: "md:hidden", customTextClass: "text-[2rem] -rotate-45"},
        ]
    ]


    return (
        <div className="w-full">
            <div className={"grid grid-rows-5"}>
                {
                    keys.map((row, i) => {
                    return (
                        <div key={keys[i][0]['symbol']}
                             className={`flex w-full ${i === 0 ? '' : 'mt-1'}`}>
                            {row.map((key, j) => {
                                return (
                                    <Key key={keys[i][j]['symbol'] + keys[i][j]['altSymbol']}
                                         data={keys[i][j]}
                                         keyboardState={keyboardStates}
                                         handler={handler}
                                    />
                                );
                            })}
                        </div>
                    );})
                }
            </div>
        </div>
    );
}

export default VirtualKeyboard;