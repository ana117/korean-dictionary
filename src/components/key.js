import React from 'react';

const Key = ({data, keyboardState, handler}) => {
    const {symbol, altSymbol} = data;
    const shift = keyboardState['shift'];
    const capsLock = keyboardState['capsLock'];
    const useAltKey = shift || capsLock;

    const handleClick = () => {
        let newSearch = keyboardState['search'];
        switch (symbol) {
            case "Backspace":
            case "⌫":
                newSearch = newSearch.slice(0, -1);
                break;

            case "Tab":
            case "LCtrl":
            case "RCtrl":
            case "​":
                break;

            case "Caps Lock":
            case "⛭":
                handler['toggleCapsLock']();
                break;

            case "LShift":
            case "RShift":
            case "⇧":
                handler['toggleShift']();
                break;

            case "Enter":
            case "⚲":
                handler['enterKey']();
                break;

            case "Space":
                newSearch += " ";
                break;

            default:
                newSearch += useAltKey ? altSymbol : symbol;
                break;
        }

        handler['handleUpdateSearch'](newSearch);
    }

    let customTextClass = data['customTextClass'] + " ";
    let customClass = data['customClass'] + " ";
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

        case "⇧":
        case "⌫":
            customClass += "basis-2/12";
            break;

        default:
            customClass += "basis-1/12";
            break;
    }

    return (
        <div
            className={`border-black border-2 flex-auto py-2 cursor-pointer hover:bg-slate-100 m-[0.1rem] md:m-1 ${customClass}`}
            onClick={handleClick}>
            <p className={`text-lg font-semibold ${customTextClass}`}>
                {useAltKey ? altSymbol : symbol}
            </p>
        </div>
    );
}

export default Key;