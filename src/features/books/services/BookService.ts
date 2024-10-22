import Book from "../models/Book";
import HttpClient from "../../../lib/http/HttpClient";
import { Language } from "../models/Language";
import PaginatedResponse from "../../../lib/api/PaginatedResponse";
import { PublicationYear } from "../models/PublicationYear";

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
}

export default new BookService();
