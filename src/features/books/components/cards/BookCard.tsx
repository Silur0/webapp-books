import "./BookCard.css";

import Book from "../../models/Book";
import BookPopup from "../popups/BookPopup";
import { useState } from "react";

interface BookCardProps {
    book: Book;
}

export default function BookCard(props: BookCardProps) {
    const [IsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div>
            <div className="book-card-content-card" onDoubleClick={openModal}>
                <div className="book-card-title">{props.book.title}</div>
                <div className="book-card-info ">
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
