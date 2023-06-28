import Modal from "./modal";

const WordDetail = ({code, name, meanings, setShowDetails}) => {
    const link = `https://krdict.korean.go.kr/eng/dicSearch/SearchView?nation=eng&nationCode=6&ParaWordNo=${code}`;

    const content = (
        <>
            <div className={"w-full"}>
                <h1 className={"text-4xl font-bold text-center"}>{name}</h1>
                <ul className={"my-5"}>
                    {meanings.map((meaning, index) => {
                        return (
                            <li className={"my-5 text-xl"} key={meaning.id}>
                                <span className={"font-bold"}>{index + 1}. {meaning.translation}</span><br/>
                                {meaning.definition}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={"flex w-full"}>
                <a className={"px-3 py-1 font-semibold border-black border-2 rounded-lg hover:drop-shadow-lg hover:bg-black hover:text-white"}
                   href={link} target={"_blank"} rel={"noreferrer"}>
                    Source
                </a>
            </div>
        </>
    );

    return <Modal content={content} setShow={setShowDetails}/>
}

export default WordDetail;