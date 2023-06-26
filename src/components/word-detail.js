import {useState} from "react";
import ReactDOM from 'react-dom'

const WordDetail = ({code, name, meanings, setShowDetails}) => {
    const [showModal, setShowModal] = useState(true);

    const link = `https://krdict.korean.go.kr/eng/dicSearch/SearchView?nation=eng&nationCode=6&ParaWordNo=${code}`;

    return ReactDOM.createPortal(
        <>
            {showModal ? (
                <div
                    className={"flex justify-center items-center fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-20"}>
                    <div className={"bg-white w-4/6 m-auto px-10 py-5 rounded-xl shadow-xl"}>
                        <div className={"flex flex-col items-center"}>
                            <div className={"w-full"}>
                                <h1 className={"text-4xl font-bold text-center"}>{name}</h1>
                                <ul className={"my-5"}>
                                    {meanings.map((meaning, index) => {
                                        return (
                                            <li className={"my-5 text-xl"} key={meaning.id}>
                                                <span
                                                    className={"font-bold"}>{index + 1}. {meaning.translation}</span><br/>
                                                {meaning.definition}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className={"flex w-full pb-3 border-b-2"}>
                                <a className={"px-3 py-1 font-semibold border-black border-2 rounded-lg hover:drop-shadow-lg hover:bg-black hover:text-white"}
                                   href={link} target={"_blank"} rel={"noreferrer"}>
                                    Source
                                </a>
                            </div>
                            <button
                                className={"mt-5 text-lg font-bold hover:underline hover:underline-offset-4"}
                                onClick={() => {
                                    setShowModal(false);
                                    setShowDetails(false);
                                }}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>, document.getElementById("root")
    )
}

export default WordDetail;