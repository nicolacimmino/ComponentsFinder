import { ApiRequest } from "./ApiRequest";

export class GetComponentsRequest extends ApiRequest {
    public start: string;
    public filter: string;

    public static schema = {
    };

    protected doParse() {
        const { start, filter } = this.req.query;
        
        this.start = start;
        this.filter = filter;
    }
}