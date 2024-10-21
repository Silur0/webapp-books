import Book from "../models/Book";
import HttpClient from "../../../lib/http/HttpClient";
import PaginatedResponse from "../../../lib/api/PaginatedResponse";

class BookService {
    static readonly PREFIX = `/books`;

    async getAll(): Promise<PaginatedResponse<Book>> {
        let result = await HttpClient.get(`${BookService.PREFIX}/`);
        return result.data;
    }
}

export default new BookService();
