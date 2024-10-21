export default interface Book {
    id: number;
    isbn: string;
    title: string;
    publicationYear: string;
    language: string;
    summary?: string;
}
