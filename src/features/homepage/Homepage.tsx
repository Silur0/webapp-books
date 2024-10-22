import "./Homepage.css";

import { useEffect, useState } from "react";

import BookService from "../books/services/BookService";
import BooksPage from "../books/BooksPage";
import FiltersSideBar from "./components/Sidebar/FiltersSideBar";
import Header from "./components/Header/Header";
import { Language } from "../books/models/Language";
import { PublicationYear } from "../books/models/PublicationYear";
import { useServiceCall } from "../../lib/utils/ServiceCall";

export default function Homepage() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [years, setYears] = useState<PublicationYear[]>([]);

    const getLanguagesService = useServiceCall(BookService.getLanguages);
    const getYearsService = useServiceCall(BookService.getPublicationYears);

    useEffect(() => {
        getLanguagesService.invoke().then((data) => {
            setLanguages(data.items);
        });
        getYearsService.invoke().then((data) => {
            setYears(data.items);
        });
    }, []);

    return (
        <div className="app-container">
            <Header />
            <div className="main-content">
                <FiltersSideBar languages={languages} years={years} />
                <BooksPage />
            </div>
        </div>
    );
}
