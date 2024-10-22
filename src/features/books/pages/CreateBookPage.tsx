import "./CreateBookPage.css";

import Select, { SingleValue } from "react-select";
import { useEffect, useState } from "react";

import BaseLayout from "../../../lib/components/layouts/BaseLayout";
import BookService from "../services/BookService";
import LanguageService from "../services/LanguageService";
import { useNavigate } from "react-router-dom";
import { useServiceCall } from "../../../lib/utils/ServiceCall";

export default function CreateBookPage() {
    const navigate = useNavigate();

    const [languages, setLanguages] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);

    const getLanguagesService = useServiceCall(LanguageService.getAll);
    const createBookService = useServiceCall(BookService.create);

    useEffect(() => {
        getLanguagesService.invoke().then((data) => {
            setLanguages(
                data.items.map((e) => ({
                    value: e.code,
                    label: e.name,
                }))
            );
        });
    }, []);

    const [isbn, setIsbn] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [publicationYear, setPublicationYear] = useState<string>("");
    const [language, setLanguage] =
        useState<SingleValue<{ value: string; label: string }>>(null);

    const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        createBookService
            .invoke(isbn, title, author, publicationYear, language?.label!)
            .then((data) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <BaseLayout>
            <form className="create-book-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="ISBN"
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                />
                <input
                    type="text"
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(e.target.value)}
                    placeholder="Publication Year"
                />
                <Select
                    onChange={setLanguage}
                    options={languages}
                    placeholder="Language"
                />
                <div className="create-book-buttons">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleCreate}>Create</button>
                </div>
            </form>
        </BaseLayout>
    );
}
