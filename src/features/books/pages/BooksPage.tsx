import "./BooksPage.css";

import Book from "../models/Book";
import BookCard from "../components/cards/BookCard";
import CreateBookButton from "../components/buttons/CreateBookButton";

interface BooksPageProps {
    books: Book[];
}

export default function BooksPage(props: BooksPageProps) {
    return (
        <div className="bookpage">
            <div className="element">
                <CreateBookButton />
            </div>

            {props.books.map((e) => {
                return (
                    <div key={e.id} className="element">
                        <BookCard book={e} />
                    </div>
                );
            })}
        </div>
    );
}
