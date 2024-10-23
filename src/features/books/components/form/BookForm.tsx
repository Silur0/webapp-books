import "./BookForm.css";

import Select, { SingleValue } from "react-select";
import { useEffect, useRef, useState } from "react";

import { AllValid } from "../../../../lib/components/inputs/validators/ValidateFormControls";
import Book from "../../models/Book";
import CustomInput from "../../../../lib/components/inputs/CustomInput";
import LanguageService from "../../services/LanguageService";
import { useFormControl } from "../../../../lib/components/inputs/form/FormControl";
import { useNavigate } from "react-router-dom";
import { useServiceCall } from "../../../../lib/utils/ServiceCall";
import { validateIsYear } from "../../../../lib/components/inputs/validators/ValidateIsYear";
import { validateRequiredField } from "../../../../lib/components/inputs/validators/ValidateRequiredField";

type BookFormProps = {
    onSubmit: (
        id: number,
        isbn: string,
        title: string,
        author: string,
        publicationYear: string,
        language: string
    ) => void;
    book?: Book;
};

export default function BookForm(props: BookFormProps) {
    const navigate = useNavigate();
    const selectRef = useRef<any>(null);

    const [languages, setLanguages] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);

    const getLanguagesService = useServiceCall(LanguageService.getAll);

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

    const isbnFormControl = useFormControl<string>({
        initialValue: props.book?.isbn,
        validators: [validateRequiredField()],
    });
    const titleFormControl = useFormControl<string>({
        initialValue: props.book?.title,
        validators: [validateRequiredField()],
    });
    const authorFormControl = useFormControl<string>({
        initialValue: props.book?.author,
        validators: [validateRequiredField()],
    });
    const publicationYearFormControl = useFormControl<string>({
        initialValue: props.book?.publicationYear,
        validators: [validateRequiredField(), validateIsYear()],
    });
    const [language, setLanguage] =
        useState<SingleValue<{ value: string; label: string }>>(null);

    const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (
            !AllValid(
                isbnFormControl.validate(),
                titleFormControl.validate(),
                authorFormControl.validate(),
                publicationYearFormControl.validate()
            )
        )
            return;

        props.onSubmit(
            props.book?.id ?? 1,
            isbnFormControl.value ?? "",
            titleFormControl.value ?? "",
            authorFormControl.value ?? "",
            publicationYearFormControl.value ?? "",
            language?.label ?? ""
        );
    };

    const handleCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/");
    };

    useEffect(() => {
        if (props.book?.language) {
            let language = languages.find(
                (e) => e.label == props.book?.language
            );
            if (language) selectRef.current.setValue(language);
        } else {
            let language = languages.find((e) => e.label == "English");
            if (language) selectRef.current.setValue(language);
        }
    }, [props.book?.language, languages]);

    return (
        <form className="book-form-content">
            <CustomInput placeholder="Title" formControl={titleFormControl} />
            <CustomInput placeholder="ISBN" formControl={isbnFormControl} />
            <CustomInput placeholder="Author" formControl={authorFormControl} />
            <CustomInput
                placeholder="Publication Year"
                formControl={publicationYearFormControl}
            />
            <Select
                ref={selectRef}
                onChange={setLanguage}
                options={languages}
                placeholder="Language"
                defaultValue={language}
            />
            <div className="book-form-buttons">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleCreate}>Create</button>
            </div>
        </form>
    );
}
