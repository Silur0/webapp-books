import { Optional, ValidatorFunction } from "../form/FormControl";

export function validateIsYear<A>(): ValidatorFunction<Optional<string>> {
    return (value: string | undefined) => {
        if (!value) {
            return null;
        }

        const currentYear = new Date().getFullYear();
        const yearPattern = /^\d{4}$/;

        if (!yearPattern.test(value)) {
            return "Invalid year format";
        }

        const yearNumber = parseInt(value);

        if (!(yearNumber >= 1000 && yearNumber <= currentYear + 100)) {
            return "Invalid year format";
        }

        return null;
    };
}
