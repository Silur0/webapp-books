import "./Homepage.css";

import BooksPage from "../books/BooksPage";
import FiltersSideBar from "./components/Sidebar/FiltersSideBar";
import Header from "./components/Header/Header";

export default function Homepage() {
    return (
        <div className="app-container">
            <Header />
            <div className="main-content">
                <FiltersSideBar />
                <BooksPage />
            </div>
        </div>
    );
}
