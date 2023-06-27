import {useState} from "react";
import WordDetail from "./word-detail";

const Word = ({word, index}) => {
    const [showDetails, setShowDetails] = useState(false);

    const showDetailModal = (event) => {
        event.preventDefault();
        setShowDetails(true);
    }

    const code = word.getElementsByTagName("target_code")[0].childNodes[0].nodeValue;
    const name = word.getElementsByTagName("word")[0].childNodes[0].nodeValue;
    const meanings = [];

    for (let i = 0; i < word.getElementsByTagName("sense").length; i++) {
        const sense = word.getElementsByTagName("sense")[i];
        const translation = sense.getElementsByTagName("trans_word")[0].childNodes[0].nodeValue;
        const definition = sense.getElementsByTagName("trans_dfn")[0].childNodes[0].nodeValue;

        meanings.push({
            "id": code + "-" + i,
            "translation": translation,
            "definition": definition
        })
    }

    return (
        <>
            <button onClick={event => showDetailModal(event)} className={`flex flex-col justify-center items-center p-5 my-5 rounded-xl shadow-xl bg-tertiary ${index === 0 ? 'md:col-span-2 lg:col-span-3 sticky top-0' : ''}`}>
                <div>
                    <h1 className={"text-3xl font-bold"}>{name}</h1>
                    <ul>
                        {meanings.map((meaning) => {
                            return <li key={meaning.id}>{meaning.translation}</li>
                        })}
                    </ul>
                </div>
            </button>
            {showDetails && <WordDetail code={code} name={name} meanings={meanings} setShowDetails={setShowDetails}/>}
        </>
    )
}

export default Word;