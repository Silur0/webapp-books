import HttpClient from "../http/HttpClient";

export type LoginResponse = {
    token: string;
};

class AuthService {
    static readonly PREFIX = `/accounts`;

    async Login(username: string, password: string): Promise<LoginResponse> {
        let result = await HttpClient.post(`${AuthService.PREFIX}/login`, {
            username,
            password,
        });
        return result.data;
    }
}

export default new AuthService();
