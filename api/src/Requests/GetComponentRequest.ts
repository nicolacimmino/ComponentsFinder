import { ApiRequest } from "./ApiRequest";

export class GetComponentRequest extends ApiRequest {
    public locator: string;

    public static schema = {
        type: "object",
        required: ["locator"],
        properties: {
            locator: {
                type: "string",
                minLength: 1,
            },
        },
    };

    protected doParse() {
        const { locator } = this.req.params;

        this.locator = locator;
    }

    protected doValidate() {
        // TODO: validate
    }
}