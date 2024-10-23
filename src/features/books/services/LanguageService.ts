import HttpClient from "../../../lib/http/HttpClient";
import { LanguageExpanded } from "../models/Language";
import PaginatedResponse from "../../../lib/api/PaginatedResponse";

class LanguageService {
    static readonly PREFIX = `/languages`;

    async getAll(): Promise<PaginatedResponse<LanguageExpanded>> {
        let result = await HttpClient.get(`${LanguageService.PREFIX}/`);
        return result.data;
    }
}

export default new LanguageService();
