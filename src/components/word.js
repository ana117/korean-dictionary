const Word = ({word, index}) => {
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
        <div
            className={`flex flex-col justify-center items-center bg-white p-5 m-5 rounded-xl shadow-xl ${index === 0 ? 'col-span-3' : ''}`}>
            <h1 className={"text-3xl font-bold"}>{name}</h1>
            <ul>
                {meanings.map((meaning) => {
                    return <li key={meaning.id}>{meaning.translation} - {meaning.definition}</li>
                })}
            </ul>
        </div>
    )
}

export default Word;