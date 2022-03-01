import { ApiRequest } from "./ApiRequest";

export class GetComponentRequest extends ApiRequest {
    public locator: string;

    protected doParse() {
        console.log("this.req");
        console.log(this.req);

        const { locator } = this.req.params;

        this.locator = locator;
    }

    protected doValidate() {
        // TODO: validate
    }    
}