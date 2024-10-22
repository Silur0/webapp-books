import "./BooksPage.css";

import Book from "./models/Book";
import BookCard from "./components/BookCard";

interface BooksPageProps {
    books: Book[];
}

export default function BooksPage(props: BooksPageProps) {
    return (
        <div className="bookpage">
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
