import "./CustomInput.css";

import { ChangeEvent } from "react";
import { IFormControl } from "./form/FormControl";
import { sanitizeInput } from "../../utils/StringUtils";

type CustomInputProps = {
    formControl: IFormControl<string>;
    placeholder?: string;
    type?: "text" | "password";
};

export default function CustomInput(props: CustomInputProps) {
    const setValue = (e: ChangeEvent<HTMLInputElement>) => {
        let sanitizedValue = sanitizeInput(e.target.value);
        props.formControl.setValue(sanitizedValue);
    };

    const handleEndEditing = (e: ChangeEvent<HTMLInputElement>) => {
        props.formControl.validate();
    };

    return (
        <div className="custom-input-content">
            <input
                className="custom-input"
                type={props.type ?? "type"}
                placeholder={props.placeholder}
                onChange={setValue}
                onBlur={handleEndEditing}
                value={props.formControl.value}
            />
            {props.formControl.hasErrors ? (
                <div className="custom-input-error">
                    {props.formControl.errorMessages}
                </div>
            ) : null}
        </div>
    );
}
