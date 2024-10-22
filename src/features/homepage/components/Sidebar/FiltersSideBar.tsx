import "./FiltersSideBar.css";

import { Language } from "../../../books/models/Language";
import { PublicationYear } from "../../../books/models/PublicationYear";
import Select from "react-select";
import { useMemo } from "react";

interface FiltersSideBarProps {
    languages: Language[];
    years: PublicationYear[];
}

export default function FiltersSideBar(props: FiltersSideBarProps) {
    const filteredLanguages = useMemo(() => {
        return props.languages.map((e) => ({
            value: e.language,
            label: e.language,
        }));
    }, [props.languages]);

    const filteredYears = useMemo(() => {
        return props.years.map((e) => ({
            value: e.year,
            label: e.year,
        }));
    }, [props.years]);

    return (
        <div className="sidebar">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="PESQUISA"
                    className="search-input"
                />
            </div>
            <div className="">
                <h3>Languages</h3>
                <Select
                    options={filteredLanguages}
                    isMulti
                    closeMenuOnSelect={false}
                />
            </div>
            <div>
                <h3>Years</h3>
                <Select
                    options={filteredYears}
                    isMulti
                    closeMenuOnSelect={false}
                />
            </div>
        </div>
    );
}
