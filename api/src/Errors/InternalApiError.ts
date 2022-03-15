import { ApiError } from "./ApiError";


export class InternalApiError extends ApiError {
    public constructor(message: string) {
        super();
        this.httpStatus = 500;
        this.message = message;
    }
}