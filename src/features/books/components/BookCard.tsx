import "./BookCard.css";

import Book from "../models/Book";
import BookPopup from "./BookPopup";
import Modal from "react-modal";
import { useState } from "react";

interface BookCardProps {
    book: Book;
}

export default function BookCard(props: BookCardProps) {
    const [IsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <div className="content-card" onDoubleClick={openModal}>
                <div className="title">{props.book.title}</div>
                <div className="info">
                    <div>{props.book.author}</div>
                    <div>{props.book.publicationYear}</div>
                </div>
            </div>
            <BookPopup
                book={props.book}
                isModel={IsOpen}
                setIsOpen={setIsOpen}
            />
        </div>
    );
}
