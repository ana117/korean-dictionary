import React from 'react';

const Key = ({symbol, withMargin, search, updateSearch, toggleShift, toggleCapslock, enterKey}) => {
    const handleClick = () => {
        let newSearch = search;
        switch (symbol) {
            case "Backspace":
                newSearch = newSearch.slice(0, -1);
                break;

            case "Tab":
            case "LCtrl":
            case "RCtrl":
                break;

            case "Caps Lock":
                toggleCapslock();
                break;
            case "LShift":
            case "RShift":
                toggleShift();
                break;

            case "Enter":
                enterKey();
                break;

            case "Space":
                newSearch += " ";
                break;

            default:
                newSearch += symbol;
                break;
        }

        updateSearch(newSearch);
    }

    let customClass = "";

    switch (symbol) {
        case "Backspace":
        case "Tab":
        case "Enter":
            customClass += "basis-2/12";
            break;

        case "Caps Lock":
        case "RShift":
            customClass += "basis-3/12";
            break;

        case "LShift":
            customClass += "basis-4/12";
            break;

        case "Space":
            customClass += "basis-7/12";
            break;

        default:
            customClass += "basis-1/12";
            break;
    }

    if (withMargin) {
        customClass += " ms-1";
    }

    return (
        <button
            className={`border-black border-2 flex-auto py-2 text-lg font-semibold hover:bg-slate-100 ${customClass}`}
            onClick={handleClick}>
            {symbol}
        </button>
    );
}

export default Key;