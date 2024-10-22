import "./BookPopup.css";

import { FaRegTrashCan, FaX } from "react-icons/fa6";

import AuthContext from "../../../../lib/authentication/AuthContext";
import Book from "../../models/Book";
import { FaEdit } from "react-icons/fa";
import Modal from "react-modal";
import { useContext } from "react";

interface BookPopupProps {
    book: Book;
    isModel: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BookPopup(props: BookPopupProps) {
    const authContext = useContext(AuthContext);

    const closeModal = () => {
        props.setIsOpen(false);
    };

    return (
        <Modal
            className="modal-content"
            isOpen={props.isModel}
            onRequestClose={closeModal}
        >
            <div className="content">
                <div className="modal-header">
                    <h2 className="modal-header-title">{props.book.title}</h2>
                    <div className="modal-icons">
                        {authContext?.authToken ? (
                            <>
                                <FaEdit className="modal-icon" />
                                <FaRegTrashCan className="modal-icon" />
                            </>
                        ) : null}
                        <FaX className="modal-icon" onClick={closeModal} />
                    </div>
                </div>
                <div>
                    <div className="info-rows">
                        <span>{props.book.author}</span>
                        <span>{props.book.isbn}</span>
                    </div>
                    <div className="info-rows">
                        <span>{props.book.language}</span>
                        <span>{props.book.publicationYear}</span>
                    </div>
                    <div>
                        <h4>Summary</h4>
                        <div className="summary">{props.book.summary}</div>
                    </div>
                </div>
                <hr />
                <div className="modal-body">
                    <h4>Recommendations</h4>
                    <div className="modal-recommendations">
                        <div className="recommendation-box"></div>
                        <div className="recommendation-box"></div>
                        <div className="recommendation-box"></div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
