import "./BooksPage.css";

import { useEffect, useState } from "react";

import Book from "./models/Book";
import BookCard from "./components/BookCard";
import BookService from "./services/BookService";
import { useServiceCall } from "../../lib/utils/ServiceCall";

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);

    const getBooksService = useServiceCall(BookService.getAll);

    useEffect(() => {
        getBooksService.invoke().then((data) => {
            setBooks(data.items);
        });
    }, []);

    if (getBooksService.isLoading) return <div>LOADING ...</div>;

    return (
        <div className="bookpage">
            {books.map((e) => {
                return (
                    <div key={e.id} className="element">
                        <BookCard book={e} />
                    </div>
                );
            })}
        </div>
    );
}
