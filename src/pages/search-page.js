import React, {useState} from "react";
import Navbar from "../components/navbar";
import Word from "../components/word";

import keyboardSVG from "../assets/keyboard.svg";
import VirtualKeyboard from "../components/VirtualKeyboard";

const SearchPage = () => {
    const [words, setWords] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

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
            q: search,
            sort: "popular",
            part: "word",
            translated: "y",
            trans_lang: "1",
        };

        const url = new URL(process.env.REACT_APP_API_URL);
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json())
            .then(data => {
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

                    setError("");
                    setWords(items);
                }
            })
            .catch(error => {
                setError("Error occurred");
        });
    }


    return (
        <section className={"h-screen flex flex-col"}>
            <Navbar/>
            <main className={"flex flex-col justify-center items-center m-10 max-h-full overflow-auto"}>
                <div className={"w-5/6 flex items-center relative"}>
                    <div className={"w-4/6 lg:w-5/6 flex justify-end items-center"}>
                        <img src={keyboardSVG} alt={"keyboard"} className={"absolute h-4/6 cursor-pointer mr-8"}/>
                        <input id={"search-bar"} type={"text"} placeholder={"Type Korean Word"} value={search}
                               onChange={handleInputChange}
                               className={"w-full py-2 px-5 rounded-2xl rounded-e-none text-lg border-black border-2 focus:outline-0"}/>
                    </div>
                    <button type={"button"} onClick={fetchWords}
                            className={"w-2/6 lg:w-1/6 ease-in duration-500 py-2 px-5 rounded-2xl rounded-s-none bg-black text-white text-lg font-bold border-black border-2"}>Search
                    </button>
                </div>

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
            <VirtualKeyboard search={search} updateSearch={updateSearch}/>
        </section>
    );
}

export default SearchPage