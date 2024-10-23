import "./CreateBookPage.css";

import BaseLayout from "../../../lib/components/layouts/BaseLayout";
import BookForm from "../components/form/BookForm";
import BookService from "../services/BookService";
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
                console.log(error);
            });
    };

    return (
        <BaseLayout>
            <BookForm onSubmit={handleCreate} />
        </BaseLayout>
    );
}
