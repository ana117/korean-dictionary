import {useState} from "react";
import ReactDOM from 'react-dom'

const Modal = ({content, setShow}) => {
    const [showModal, setShowModal] = useState(true);
    return ReactDOM.createPortal(
        <>
            {showModal ? (
                <div
                    className={"flex justify-center items-center fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-20"}>
                    <div className={"bg-white w-4/6 m-auto px-10 py-5 rounded-xl shadow-xl"}>
                        <div className={"flex flex-col items-center"}>
                            <div className={"w-full pb-3 border-b-2"}>
                                {content}
                            </div>
                            <button
                                className={"w-4/6 mt-3 text-lg font-bold hover:underline hover:underline-offset-4"}
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