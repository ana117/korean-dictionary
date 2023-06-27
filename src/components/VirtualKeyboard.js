import Key from "./key";
import {useState} from "react";

const VirtualKeyboard = ({search, updateSearch}) => {
    const [shift, setShift] = useState(false);
    const [capsLock, setCapsLock] = useState(false);

    const handleUpdateSearch = (newSearch) => {
        if (shift) {
            setShift(false);
        }
        updateSearch(newSearch);
    }
    const toggleShift = () => {
        setShift(!shift);
    }

    const toggleCapsLock = () => {
        setCapsLock(!capsLock);
    }

    const keys = [
        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ", "[", "]", "\\"],
        ["Caps Lock", "ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ", ";", "'", "Enter"],
        ["LShift", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", ",", ".", "/", "RShift"],
        ["LCtrl", "Space", "RCtrl"]
    ];

    const altKeys = [
        ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace"],
        ["Tab", "ㅃ", "ㅉ", "ㄸ", "ㄲ", "ㅆ", "", "", "", "ㅒ", "ㅖ", "{", "}", "|"],
        ["Caps Lock", "", "", "", "", "", "", "", "", "", ":", "\"", "Enter"],
        ["LShift", "", "", "", "", "", "", "", "<", ">", "?", "RShift"],
        ["LCtrl", "Space", "RCtrl"]
    ];

    if (capsLock) {
        return (
            <div className="w-full">
                <div className={"m-5"}>
                    <div className={"grid grid-rows-5"}>
                        {altKeys.map((row, i) => {
                            return (
                                <div key={keys[i][0] + keys[i][1]}
                                     className={`flex w-full ${i === 0 ? '' : 'mt-1'}`}>
                                    {row.map((key, j) => {
                                        return (
                                            <Key key={keys[i][j]} symbol={key} withMargin={j !== 0} search={search}
                                                 updateSearch={handleUpdateSearch} toggleShift={toggleShift}
                                                 toggleCapslock={toggleCapsLock}/>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }

    if (shift) {
        return (
            <div className="w-full">
                <div className={"m-5"}>
                    <div className={"grid grid-rows-5"}>
                        {altKeys.map((row, i) => {
                            return (
                                <div key={keys[i][0] + keys[i][1]}
                                     className={`flex w-full ${i === 0 ? '' : 'mt-1'}`}>
                                    {row.map((key, j) => {
                                        return (
                                            <Key key={keys[i][j]} symbol={key} withMargin={j !== 0} search={search}
                                                 updateSearch={handleUpdateSearch} toggleShift={toggleShift}
                                                 toggleCapslock={toggleCapsLock}/>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className={"m-5"}>
                <div className={"grid grid-rows-5"}>
                    {keys.map((row, i) => {
                        return (
                            <div key={keys[i][0] + keys[i][1]}
                                 className={`flex w-full ${i === 0 ? '' : 'mt-1'}`}>
                                {row.map((key, j) => {
                                    return (
                                        <Key key={keys[i][j]} symbol={key} withMargin={j !== 0} search={search}
                                             updateSearch={handleUpdateSearch} toggleShift={toggleShift}
                                             toggleCapslock={toggleCapsLock}/>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default VirtualKeyboard;