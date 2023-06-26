import React, {useState} from "react";
import Navbar from "../components/navbar";
import Word from "../components/word";

import data from "./test.xml"

const API_URL = "https://krdict.korean.go.kr/api/search";
const SearchPage = () => {
    const [words, setWords] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const fetchWords = async () => {
        const params = {
            key: "3635F04F0A3F3E75159A99CC61318E92",
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
        <section className={"min-h-screen flex flex-col bg-red-100"}>
            <Navbar/>
            <main className={"flex flex-col justify-center items-center m-10"}>
                <div className={"w-5/6 flex justify-center items-center"}>
                    <input type={"text"} placeholder={"Type Korean Word"} value={search} onChange={handleSearchChange}
                           className={"w-5/6 py-2 px-5 border border-gray-400 rounded-2xl rounded-e-none text-lg border-black border-2 focus:outline-0"}/>
                    <button type={"button"} onClick={fetchWords}
                            className={"w-1/6 py-2 px-5 border border-gray-400 rounded-2xl rounded-s-none bg-black text-white text-lg font-bold border-black border-2"}>Search
                    </button>
                </div>

                <div className={"w-5/6 grid grid-cols-3 gap-5 mt-5"}>
                    {words.map((word, index) => {
                        return <Word key={word.id} word={word.word} index={index}/>
                    })}
                </div>
            </main>
        </section>
    );
}

export default SearchPage