import React, {useState} from "react";
import Navbar from "../components/navbar";
import Word from "../components/word";

import keyboardSVG from "../assets/keyboard.svg";
import loadingSVG from "../assets/loading.svg";
import VirtualKeyboard from "../components/VirtualKeyboard";

const SearchPage = () => {
    const [words, setWords] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const Hangul = require('hangul-js');

    const updateSearch = (newSearch) => {
        let disassembled = Hangul.disassemble(newSearch);
        let assembled = Hangul.assemble(disassembled);
        setSearch(assembled);
    }

    const handleInputChange = (event) => {
        updateSearch(event.target.value);
    }

    const fetchWords = async () => {
        const params = {
            key: process.env.REACT_APP_API_KEY,
            q: search,
            sort: "popular",
            part: "word",
            translated: "y",
            trans_lang: "1",
        };

        const url = new URL(process.env.REACT_APP_API_URL);
        url.search = new URLSearchParams(params).toString();

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

    return (
        <section className={"h-screen flex flex-col"}>
            <Navbar/>
            <main className={"flex flex-col justify-center items-center m-10 max-h-full overflow-auto"}>
                <div className={"w-full flex items-center relative"}>
                    <div className={"w-full lg:w-5/6 flex justify-end items-center"}>
                        <img src={keyboardSVG} alt={"keyboard"} className={"absolute h-4/6 cursor-pointer mr-8 hidden md:block"}
                             onClick={handleShowKeyboard}/>
                        <input id={"search-bar"} type={"text"} placeholder={"Type Korean Word"} value={search}
                               onChange={handleInputChange}
                               className={"w-full py-2 ps-5 pe-20 rounded-2xl rounded-e-none text-lg border-black border-2 focus:outline-0"}/>
                    </div>
                    <button type={"button"} onClick={fetchWords}
                            className={"w-2/6 lg:w-1/6 ease-in duration-500 py-2 px-5 rounded-2xl rounded-s-none bg-black text-white text-lg font-bold border-black border-2"}>Search
                    </button>
                </div>

                {showLoading &&
                    <h3 className={"text-2xl flex items-center font-semibold text-center mt-5"}>
                        <img src={loadingSVG} alt={"loading"} className={"h-10 animate-spin-slow"}/>
                        <p>Loading</p>
                    </h3>
                }

                {error !== "" ?
                    (
                        <h3 className={"text-2xl font-semibold text-secondary underline underline-offset-2 text-center mt-5"}>{error}</h3>)
                    :
                    (<div
                        className={"w-5/6 px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 overflow-auto"}>
                        {words.map((word, index) => {
                            return <Word key={word['target_code']} word={word} index={index}/>
                        })}
                    </div>)
                }
            </main>

            <div className={"flex justify-center w-full"}>
                <div className={"w-full max-w-5xl hidden md:block"}>
                    {showKeyboard && <VirtualKeyboard search={search} updateSearch={updateSearch}/>}
                </div>
            </div>
        </section>
    );
}

export default SearchPage