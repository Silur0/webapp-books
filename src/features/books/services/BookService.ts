import Book from "../models/Book";
import { BookRecommendation } from "../models/BookRecommendation";
import HttpClient from "../../../lib/http/HttpClient";
import { Language } from "../models/Language";
import PaginatedResponse from "../../../lib/api/PaginatedResponse";
import { PublicationYear } from "../models/PublicationYear";

interface SearchBookRequest {
    key?: string;
    years?: string[];
    languages?: string[];
}

interface CreateBookRequest {
    isbn: string;
    title: string;
    author: string;
    publicationYear: string;
    language: string;
}

interface UpdateBookRequest {
    isbn?: string;
    title?: string;
    author?: string;
    publicationYear?: string;
    language?: string;
}

class BookService {
    static readonly PREFIX = `/books`;

    async getAll(): Promise<PaginatedResponse<Book>> {
        let result = await HttpClient.get(`${BookService.PREFIX}/`);
        return result.data;
    }

    async get(id: string): Promise<Book> {
        let result = await HttpClient.get(`${BookService.PREFIX}/${id}`);
        return result.data;
    }

    async getLanguages(): Promise<PaginatedResponse<Language>> {
        let result = await HttpClient.get(`${BookService.PREFIX}/languages`);
        return result.data;
    }

    async getPublicationYears(): Promise<PaginatedResponse<PublicationYear>> {
        let result = await HttpClient.get(`${BookService.PREFIX}/years`);
        return result.data;
    }

    async search(
        key: string,
        years: string[],
        languages: string[]
    ): Promise<PaginatedResponse<Book>> {
        let request: SearchBookRequest = {
            years,
            languages,
        };

        if (key) {
            request.key = key;
        }

        let result = await HttpClient.post(
            `${BookService.PREFIX}/search`,
            request
        );
        return result.data;
    }

    async create(
        isbn: string,
        title: string,
        author: string,
        publicationYear: string,
        language: string
    ): Promise<Book> {
        let request: CreateBookRequest = {
            isbn: isbn,
            title: title,
            author: author,
            publicationYear: publicationYear,
            language: language,
        };

        let result = await HttpClient.post(`${BookService.PREFIX}`, request);
        return result.data;
    }

    async update(
        id: number,
        isbn?: string,
        title?: string,
        author?: string,
        publicationYear?: string,
        language?: string
    ): Promise<Book> {
        let request: UpdateBookRequest = {
            isbn: isbn,
            title: title,
            author: author,
            publicationYear: publicationYear,
            language: language,
        };

        let result = await HttpClient.put(
            `${BookService.PREFIX}/${id}`,
            request
        );
        return result.data;
    }

    async delete(id: number): Promise<boolean> {
        let result = await HttpClient.delete(`${BookService.PREFIX}/${id}`);
        return result.data;
    }

    async getRecommendations(
        id: number
    ): Promise<PaginatedResponse<BookRecommendation>> {
        let result = await HttpClient.get(
            `${BookService.PREFIX}/${id}/recommendations`
        );
        return result.data;
    }
}

export default new BookService();
