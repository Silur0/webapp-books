import "./CreateBookPage.css";

import BaseLayout from "../../../lib/components/layouts/BaseLayout";
import BookForm from "../components/form/BookForm";
import BookService from "../services/BookService";
import { Logger } from "../../../lib/logger/Logger";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useServiceCall } from "../../../lib/utils/ServiceCall";

export default function CreateBookPage() {
    const navigate = useNavigate();
    const createBookService = useServiceCall(BookService.create);

    const handleCreate = (
        id: number,
        isbn: string,
        title: string,
        author: string,
        publicationYear: string,
        language: string
    ) => {
        createBookService
            .invoke(isbn, title, author, publicationYear, language)
            .then((data) => {
                navigate("/");
            })
            .catch((error) => {
                Logger.error(error.response);
                toast.error(error.response.data.message);
            });
    };

    return (
        <BaseLayout>
            <BookForm onSubmit={handleCreate} label="Create" />
        </BaseLayout>
    );
}
