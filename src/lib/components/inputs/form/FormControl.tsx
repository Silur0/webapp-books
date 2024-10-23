import { useCallback, useEffect, useMemo, useState } from "react";

export type Optional<T> = T | undefined;
export type ErrorMessage = string;
export type ValidatorFunction<T> = (value: T) => ErrorMessage | null;

export interface IFormControl<T> {
    value: Optional<T>;
    setValue: (value: Optional<T>) => void;
    errorMessages: string[];
    setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>;
    isValid: boolean;
    isDisabled: boolean;
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    hasErrors: boolean;
    validate: () => boolean;
}

export interface IUserFormControlParameters<T> {
    initialValue?: T;
    isDisabled?: boolean;
    validators?: ValidatorFunction<Optional<T>>[];
    enableAutoValidate?: boolean;
}

export function useFormControl<T>(
    options: IUserFormControlParameters<T>
): IFormControl<T> {
    const [value, setValue] = useState<Optional<T>>(options?.initialValue);

    const [isDisabled, setIsDisabled] = useState<boolean>(
        options?.isDisabled || false
    );

    const [isValid, setIsValid] = useState(true);

    const [isDirty, setIsDirty] = useState(false);

    const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([]);

    const validate = useCallback(() => {
        let errors: ErrorMessage[] = [];

        options?.validators?.forEach((validator) => {
            let error = validator(value);
            if (error) {
                errors.push(error);
            }
        });
        setErrorMessages(errors);
        setIsValid(!errors.length);
        return !errors.length;
    }, [options.validators, value, setErrorMessages, setIsValid]);

    useEffect(() => {
        if (options.isDisabled) setIsDisabled(options.isDisabled);
    }, [options.isDisabled]);

    useEffect(() => {
        // Adicionado o isDisabled à condição para não fazer a verificação nos campos desativados
        if (value && !isDirty && !isDisabled) {
            setIsDirty(true);

            if (options?.enableAutoValidate) {
                validate();
            }
        }

        if (options?.enableAutoValidate && isDirty) {
            validate();
        }
    }, [value, options?.enableAutoValidate, options?.isDisabled, isDisabled]);

    const hasErrors = useMemo(
        () =>
            errorMessages && errorMessages.length && !isDisabled ? true : false,
        [errorMessages]
    );

    return {
        value,
        setValue,
        isDisabled,
        setIsDisabled,
        hasErrors,
        setErrorMessages,
        errorMessages,
        isValid,
        validate,
    };
}
