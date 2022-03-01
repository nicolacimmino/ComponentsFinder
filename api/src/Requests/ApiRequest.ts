import { body, validationResult } from "express-validator";
import { InputInvalidApiError } from "../Errors/InputInvalidApiError";

export abstract class ApiRequest {
    protected req;

    protected abstract doParse();

    protected abstract doValidate();

    public parse() {
        this.doValidate();

        // TODO: raise validation errors as InputInvalid
        
        this.doParse();
    }

    public constructor(req: any) {
        this.req = req;
    }
}