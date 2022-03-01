import { ApiRequest } from "./ApiRequest";

export class GetComponentRequest extends ApiRequest {
    public locator: string;

    protected parse() {
        const { locator } = this.req.params;

        this.locator = locator;
    }
}