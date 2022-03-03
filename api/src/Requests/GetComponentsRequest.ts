import { ApiRequest } from "./ApiRequest";

export class GetComponentsRequest extends ApiRequest {
    public start: string;

    public static schema = {
    };

    protected doParse() {
        const { start } = this.req.query;
        
        this.start = start;
    }
}