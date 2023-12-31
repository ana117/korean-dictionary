import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar";
import Word from "../components/word";

import keyboardSVG from "../assets/keyboard.svg";
import loadingSVG from "../assets/loading.svg";
import VirtualKeyboard from "../components/virtual-keyboard";
import ServerStatus from "../components/serverStatus";

const SearchPage = () => {
    const [words, setWords] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [serverOnline, setServerOnline] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const Hangul = require('hangul-js');

    useEffect(() => {
        pingServer();
    });

    let pingCount = 0;
    const maxPingCount = 5;
    const pingServer = () => {
        fetch(process.env.REACT_APP_API_URL + '/ping')
            .then(response => response.json())
            .then(data => {
                if (data["message"] === "pong") {
                    setServerOnline(true);
                    pingCount = 0;
                }
            })
            .catch(() => {
                setServerOnline(false);
                if (pingCount < maxPingCount) {
                    pingCount++;
                    setTimeout(pingServer, 5000);
                }
            });
    }

    const updateSearch = (newSearch) => {
        let disassembled = Hangul.disassemble(newSearch);
        let assembled = Hangul.assemble(disassembled);
        setSearch(assembled);
    }

    const handleEnterKey = async () => {
        await fetchWords();
    }

    const handleInputChange = (event) => {
        updateSearch(event.target.value);
    }

    const fetchWords = async () => {
        if (search === "") {
            setError("Please enter a word to search");
            return;
        }

        let api_url = process.env.REACT_APP_API_URL;
        if (!Hangul.isCompleteAll(search)) {
            api_url += "/eng"
        }

        const params = {
            key: process.env.REACT_APP_API_KEY,
            q: search,
            sort: "popular",
            part: "word",
            translated: "y",
            trans_lang: "1",
        };

        const url = new URL(api_url);
        url.search = new URLSearchParams(params).toString();

        setWords([]);
        setError("");
        setShowLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setShowLoading(false);
                if (data["error"]) {
                    let code = data["error"]["error_code"];
                    let msg = data["error"]["message"];
                    setError(`Error ${code}: ${msg}`);
                    return;
                }

                let channel = data["channel"];
                if (channel["total"] === "0") {
                    setError("No results found");
                } else {
                    let items = channel["item"];
                    setWords(items);
                }
            })
            .catch(() => {
                setShowLoading(false);
                setError("Error occurred");
            });
    }

    const handleShowKeyboard = () => {
        setShowKeyboard(!showKeyboard);
    }

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            await fetchWords();
        }
    }

    return (
        <section className={"h-screen flex flex-col bg-slate-50"}>
            <Navbar/>

            <main
                className={"flex flex-col justify-center items-center px-2 md:px-10 pt-5 md:pt-10 pb-1 h-full max-h-full overflow-y-auto"}>
                <div className={"w-full flex items-center relative grow-0 px-2"}>
                    <div className={"w-full lg:w-5/6 flex justify-end items-center"}>
                        <ServerStatus serverOnline={serverOnline} pingServer={pingServer}/>

                        <img src={keyboardSVG} alt={"keyboard"}
                             className={"absolute h-3/6 md:h-4/6 cursor-pointer mr-4 md:mr-8"}
                             onClick={handleShowKeyboard}/>
                        <input id={"search-bar"} type={"text"} placeholder={"Type here"}
                               onChange={handleInputChange} value={search} onKeyDown={handleKeyDown}
                               className={"w-full py-2 ps-5 pe-20 rounded-2xl rounded-e-none text-lg border-black border-2 focus:outline-0"}/>
                    </div>

                    <button type={"button"} onClick={fetchWords}
                            className={"w-2/6 lg:w-1/6 ease-in duration-500 py-2 px-2 md:px-5 rounded-2xl rounded-s-none bg-black text-white text-lg font-bold border-black border-2"}>Search
                    </button>
                </div>

                <div className={"flex flex-col justify-center items-center overflow-y-auto w-full grow"}>
                    {showLoading &&
                        <h3 className={"text-2xl flex items-center font-semibold text-center mt-5"}>
                            <img src={loadingSVG} alt={"loading"} className={"h-10 animate-spin-slow"}/>
                            <p>Loading</p>
                        </h3>
                    }

                    {error !== "" ?
                        (
                            <h3 className={"text-2xl font-semibold text-secondary underline underline-offset-2 text-center mt-5"}>
                                {error}
                            </h3>
                        )
                        :
                        (
                            <div
                                className={"w-5/6 px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 overflow-auto"}>
                                {words.map((word, index) => {
                                    return <Word key={word['target_code']} word={word} index={index}/>
                                })}
                            </div>
                        )
                    }
                </div>

                <div className={"flex justify-center w-full grow-0 py-2"}>
                    <div className={"w-full max-w-5xl bg-white rounded-lg"}>
                        {showKeyboard &&
                            <VirtualKeyboard search={search} updateSearch={updateSearch} enterKey={handleEnterKey}/>}
                    </div>
                </div>
            </main>
        </section>
    );
}

export default SearchPage