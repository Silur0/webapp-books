export default interface Book {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publicationYear: string;
    language: string;
    summary?: string;
}
