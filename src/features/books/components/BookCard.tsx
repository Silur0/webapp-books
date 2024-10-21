import "./BookCard.css";

import Book from "../models/Book";

interface BookCardProps {
    book: Book;
}

export default function BookCard(props: BookCardProps) {
    return (
        <div>
            <div>{props.book.isbn}</div>
        </div>
    );
}
