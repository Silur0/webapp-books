import "./CreateBookPage.css";

import Select, { SingleValue } from "react-select";
import { useEffect, useState } from "react";

import { AllValid } from "../../../lib/components/inputs/validators/ValidateFormControls";
import BaseLayout from "../../../lib/components/layouts/BaseLayout";
import BookService from "../services/BookService";
import CustomInput from "../../../lib/components/inputs/CustomInput";
import LanguageService from "../services/LanguageService";
import { useFormControl } from "../../../lib/components/inputs/form/FormControl";
import { useNavigate } from "react-router-dom";
import { useServiceCall } from "../../../lib/utils/ServiceCall";
import { validateIsYear } from "../../../lib/components/inputs/validators/ValidateIsYear";
import { validateRequiredField } from "../../../lib/components/inputs/validators/ValidateRequiredField";

export default function CreateBookPage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

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

    const isbnFormControl = useFormControl<string>({
        validators: [validateRequiredField()],
    });
    const titleFormControl = useFormControl<string>({
        validators: [validateRequiredField()],
    });
    const authorFormControl = useFormControl<string>({
        validators: [validateRequiredField()],
    });
    const publicationYearFormControl = useFormControl<string>({
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

        /* createBookService
            .invoke(isbn, title, author, publicationYear, language?.label!)
            .then((data) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            }); */
    };

    const handleCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <BaseLayout>
            <form className="create-book-form">
                <CustomInput
                    placeholder="Title"
                    formControl={titleFormControl}
                />
                <CustomInput placeholder="ISBN" formControl={isbnFormControl} />
                <CustomInput
                    placeholder="Author"
                    formControl={authorFormControl}
                />
                <CustomInput
                    placeholder="Publication Year"
                    formControl={publicationYearFormControl}
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
