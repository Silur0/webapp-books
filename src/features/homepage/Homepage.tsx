import "./Homepage.css";

import { useEffect, useState } from "react";

import Book from "../books/models/Book";
import BookService from "../books/services/BookService";
import BooksPage from "../books/pages/BooksPage";
import FiltersSideBar from "./components/Sidebar/FiltersSideBar";
import Header from "./components/Header/Header";
import { Language } from "../books/models/Language";
import { Logger } from "../../lib/logger/Logger";
import { PublicationYear } from "../books/models/PublicationYear";
import { toast } from "react-toastify";
import { useServiceCall } from "../../lib/utils/ServiceCall";

export default function Homepage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [years, setYears] = useState<PublicationYear[]>([]);

    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [searchKey, setSearchKey] = useState<string>("");

    const getLanguagesService = useServiceCall(BookService.getLanguages);
    const getYearsService = useServiceCall(BookService.getPublicationYears);
    const searchBooksService = useServiceCall(BookService.search);

    useEffect(() => {
        getLanguagesService
            .invoke()
            .then((data) => {
                setLanguages(data.items);
            })
            .catch((error) => {
                Logger.error(error.response);
                toast.error(error.response.data.message);
            });
        getYearsService
            .invoke()
            .then((data) => {
                setYears(data.items);
            })
            .catch((error) => {
                Logger.error(error.response);
                toast.error(error.response.data.message);
            });
    }, []);

    useEffect(() => {
        searchBooksService
            .invoke(searchKey, selectedYears, selectedLanguages)
            .then((data) => {
                setBooks(data.items);
            })
            .catch((error) => {
                Logger.error(error.response);
                toast.error(error.response.data.message);
            });
    }, [selectedLanguages, selectedYears, searchKey]);

    return (
        <div className="app-container">
            <Header />
            <div className="main-content">
                <FiltersSideBar
                    languages={languages}
                    years={years}
                    setSelectedLanguages={setSelectedLanguages}
                    setSelectedYears={setSelectedYears}
                    setSearchKey={setSearchKey}
                />
                <BooksPage books={books} />
            </div>
        </div>
    );
}
