export function AllValid(...validationResults: boolean[]) {
    return validationResults.every(Boolean);
}
