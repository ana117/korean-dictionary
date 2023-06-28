import {useState} from "react";
import WordDetail from "./word-detail";

const Word = ({word, index}) => {
    const [showDetails, setShowDetails] = useState(false);

    const showDetailModal = (event) => {
        event.preventDefault();
        setShowDetails(true);
    }

    const code = word["target_code"];
    const name = word["word"];
    const meanings = [];

    const sense = word["sense"];
    if (Array.isArray(sense)) {
        for (let i = 0; i < sense.length; i++) {
            const translated_sense = sense[i]["translation"];
            const translation = translated_sense["trans_word"]
            const definition = translated_sense["trans_dfn"]

            meanings.push({
                "id": code + "-" + i,
                "translation": translation,
                "definition": definition
            })
        }
    } else {
        const translated_sense = sense["translation"];
        let translation, definition;
        if (translated_sense === undefined) {
            translation = "No translation available";
            definition = "";
        } else {
            translation = translated_sense["trans_word"];
            definition = translated_sense["trans_dfn"];
        }

        meanings.push({
            "id": code + "-0",
            "translation": translation,
            "definition": definition
        });
    }


    return (
        <>
            <button onClick={event => showDetailModal(event)}
                    className={`flex flex-col justify-center items-center p-5 my-5 rounded-xl shadow-xl bg-tertiary ${index === 0 ? 'md:col-span-2 lg:col-span-3 sticky top-0' : ''}`}>
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