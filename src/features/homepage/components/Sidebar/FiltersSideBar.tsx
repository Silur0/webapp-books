import "./FiltersSideBar.css";

import Select, { MultiValue } from "react-select";
import { useEffect, useMemo } from "react";

import CustomInput from "../../../../lib/components/inputs/CustomInput";
import { Language } from "../../../books/models/Language";
import { PublicationYear } from "../../../books/models/PublicationYear";
import { useFormControl } from "../../../../lib/components/inputs/form/FormControl";

interface FiltersSideBarProps {
    languages: Language[];
    years: PublicationYear[];
    setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedYears: React.Dispatch<React.SetStateAction<string[]>>;
    setSearchKey: React.Dispatch<React.SetStateAction<string>>;
}

export default function FiltersSideBar(props: FiltersSideBarProps) {
    const searchKeyFormControl = useFormControl<string>({});

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

    const setLanguages = (
        newValue: MultiValue<{ value: string; label: string }>
    ) => {
        props.setSelectedLanguages(
            newValue.map((e) => {
                return e.value;
            })
        );
    };

    const setYears = (
        newValue: MultiValue<{ value: string; label: string }>
    ) => {
        props.setSelectedYears(
            newValue.map((e) => {
                return e.value;
            })
        );
    };

    useEffect(() => {
        props.setSearchKey(searchKeyFormControl.value ?? "");
    }, [searchKeyFormControl.value]);

    return (
        <div className="sidebar">
            <div className="search-container">
                <CustomInput
                    placeholder="Search..."
                    formControl={searchKeyFormControl}
                />
            </div>
            <div className="">
                <h3>Languages</h3>
                <Select
                    options={filteredLanguages}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={setLanguages}
                />
            </div>
            <div>
                <h3>Years</h3>
                <Select
                    options={filteredYears}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={setYears}
                />
            </div>
        </div>
    );
}
