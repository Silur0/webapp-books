import Book from "../models/Book";
import HttpClient from "../../../lib/http/HttpClient";
import { Language } from "../models/Language";
import PaginatedResponse from "../../../lib/api/PaginatedResponse";
import { PublicationYear } from "../models/PublicationYear";

interface SearchBookRequest {
    key?: string;
    years?: string[];
    languages?: string[];
}

class BookService {
    static readonly PREFIX = `/books`;

    async getAll(): Promise<PaginatedResponse<Book>> {
        let result = await HttpClient.get(`${BookService.PREFIX}/`);
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

        console.log(request);

        let result = await HttpClient.post(
            `${BookService.PREFIX}/search`,
            request
        );
        return result.data;
    }
}

export default new BookService();
