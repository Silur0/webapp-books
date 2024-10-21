export default interface PaginatedResponse<T> {
    page: number;
    count: number;
    total: number;
    items: T[];
}
