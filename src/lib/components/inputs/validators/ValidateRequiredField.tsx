import { Optional, ValidatorFunction } from "../form/FormControl";

export function validateRequiredField<A>(): ValidatorFunction<Optional<A>> {
    return (value: A | undefined) => {
        if (!value) {
            return "Field is required";
        }
        return null;
    };
}
