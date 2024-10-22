import "./BooksPage.css";

import AuthContext from "../../../lib/authentication/AuthContext";
import Book from "../models/Book";
import BookCard from "../components/cards/BookCard";
import CreateBookButton from "../components/buttons/CreateBookButton";
import { useContext } from "react";

interface BooksPageProps {
    books: Book[];
}

export default function BooksPage(props: BooksPageProps) {
    const authContext = useContext(AuthContext);
    return (
        <div className="bookpage">
            {authContext?.authToken ? (
                <div className="element">
                    <CreateBookButton />
                </div>
            ) : null}

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
