import React, {useState} from "react";

const ServerStatus = ({serverOnline, pingServer}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleEnterHover = () => {
        setShowTooltip(true);
    }

    const handleExitHover = () => {
        setShowTooltip(false)
    }

    return (
        <div className={"me-5"}>
            {showTooltip &&
                <div
                    className="absolute translate-x-10 -translate-y-3.5 w-fit bg-black text-white rounded-md shadow-md p-2">
                    <p className="text-md">Server is
                        <span className={`font-bold ${serverOnline ? 'text-green-500' : 'text-red-500'}`}>
                        {serverOnline ? " online" : " offline"}
                    </span>
                    </p>
                </div>
            }
            <div className="flex items-center justify-center hover:cursor-pointer"
                 onMouseEnter={handleEnterHover} onMouseLeave={handleExitHover} onClick={pingServer}>
                {serverOnline ?
                    <div className={"bg-green-500 rounded-full w-3 h-3"}/>
                    :
                    <div className={"bg-red-500 rounded-full w-3 h-3"}/>
                }
            </div>
        </div>
    );
}

export default ServerStatus;
