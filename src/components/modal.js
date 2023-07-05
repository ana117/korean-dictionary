import {useState} from "react";
import ReactDOM from 'react-dom'

const Modal = ({title, content, setShow}) => {
    const [showModal, setShowModal] = useState(true);
    return ReactDOM.createPortal(
        <>
            {showModal ? (
                <div
                    className={"flex justify-center items-center fixed z-10 inset-0 bg-black bg-opacity-20"}>
                    <div className={"bg-white w-5/6 lg:w-3/6 m-auto px-10 py-4 rounded-xl shadow-xl"}>
                        <div className={"flex flex-col justify-center items-center h-full"}>
                            <div className={"text-4xl font-bold text-center"}>
                                {title}
                            </div>
                            <div className={"w-full my-3 pe-5 border-y-2 max-h-[50vh] overflow-y-auto"}>
                                <div className={"overflow-y-auto"}>
                                    {content}
                                </div>
                            </div>
                            <button
                                className={"w-4/6 h-fit text-lg font-bold hover:underline hover:underline-offset-4"}
                                onClick={() => {
                                    setShowModal(false);
                                    setShow(false);
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

export default Modal;