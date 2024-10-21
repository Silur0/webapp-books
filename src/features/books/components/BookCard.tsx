import "./BookCard.css";

import Book from "../models/Book";

interface BookCardProps {
    book: Book;
}

export default function BookCard(props: BookCardProps) {
    return (
        <div className="content-card">
            <div className="title">{props.book.title}</div>
            <div className="info">
                <div>{props.book.author}</div>
                <div>{props.book.publicationYear}</div>
            </div>
        </div>
    );
}
