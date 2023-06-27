import React, {useState} from "react";
import Navbar from "../components/navbar";
import Word from "../components/word";

import data from "./test.xml"
import keyboardSVG from "../assets/keyboard.svg";
import VirtualKeyboard from "../components/VirtualKeyboard";

const API_URL = "https://krdict.korean.go.kr/api/search";
const SearchPage = () => {
    const [words, setWords] = useState([]);
    const [search, setSearch] = useState("");

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
            key: "-",
            q: search,
            sort: "popular",
            part: "word",
            translated: "y",
            trans_lang: "1",
        }

        const url = new URL(API_URL);
        url.search = new URLSearchParams(params).toString();
        console.log(url.toString());

        const rawFile = new XMLHttpRequest();
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(rawFile.responseText, "text/xml");

                    const wordList = xmlDoc.getElementsByTagName("item");
                    const wordArray = [];

                    for (const word of wordList) {
                        wordArray.push({
                            "id": word.getElementsByTagName("target_code")[0].childNodes[0].nodeValue,
                            "word": word
                        });
                    }

                    setWords(wordArray);
                }
            }
        }

        rawFile.open('GET', data, false);
        rawFile.send(null);
    }


    return (
        <section className={"h-screen flex flex-col"}>
            <Navbar/>
            <main className={"flex flex-col justify-center items-center m-10 max-h-full overflow-auto"}>
                <div className={"w-5/6 flex items-center relative"}>
                    <div className={"w-4/6 lg:w-5/6 flex justify-end items-center"}>
                        <img src={keyboardSVG} alt={"keyboard"} className={"absolute h-4/6 cursor-pointer mr-8"}/>
                        <input id={"search-bar"} type={"text"} placeholder={"Type Korean Word"} value={search} onChange={handleInputChange}
                               className={"w-full py-2 px-5 rounded-2xl rounded-e-none text-lg border-black border-2 focus:outline-0"}/>
                    </div>
                    <button type={"button"} onClick={fetchWords}
                            className={"w-2/6 lg:w-1/6 ease-in duration-500 py-2 px-5 rounded-2xl rounded-s-none bg-black text-white text-lg font-bold border-black border-2"}>Search
                    </button>
                </div>

                <div className={"w-5/6 px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 overflow-auto"}>
                    {words.map((word, index) => {
                        return <Word key={word.id} word={word.word} index={index}/>
                    })}
                </div>
            </main>
            <VirtualKeyboard search={search} updateSearch={updateSearch}/>
        </section>
    );
}

export default SearchPage