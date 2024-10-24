import "./UpdateBookPage.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BaseLayout from "../../../lib/components/layouts/BaseLayout";
import Book from "../models/Book";
import BookForm from "../components/form/BookForm";
import BookService from "../services/BookService";
import { Logger } from "../../../lib/logger/Logger";
import { toast } from "react-toastify";
import { useServiceCall } from "../../../lib/utils/ServiceCall";

export default function UpdateBookPage() {
    const { id } = useParams();
    const [book, setBook] = useState<Book>();

    const navigate = useNavigate();
    const updateBookService = useServiceCall(BookService.update);
    const getBookService = useServiceCall(BookService.get);

    useEffect(() => {
        if (!id) return;

        getBookService
            .invoke(id)
            .then((data) => {
                setBook(data);
            })
            .catch((error) => {
                Logger.error(error.response);
                toast.error(error.response.data.message);
            });
    }, [id]);

    const handleUpdate = (
        id: number,
        isbn: string,
        title: string,
        author: string,
        publicationYear: string,
        language: string
    ) => {
        updateBookService
            .invoke(id, isbn, title, author, publicationYear, language)
            .then((data) => {
                navigate("/");
            })
            .catch((error) => {
                Logger.error(error.response);
                toast.error(error.response.data.message);
            });
    };

    if (getBookService.isLoading) return <div>Is loading</div>;

    return (
        <BaseLayout>
            <BookForm onSubmit={handleUpdate} book={book} label="Update" />
        </BaseLayout>
    );
}
