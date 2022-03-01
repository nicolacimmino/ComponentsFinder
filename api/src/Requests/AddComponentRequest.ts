import { Component } from "../Models/Component";
import { ComponentsApiTransformer } from "../Transformers/ComponentApiTransformer";
import { ApiRequest } from "./ApiRequest";

export class AddComponentRequest extends ApiRequest {
    public component: Component;

    public static schema = {
        type: "object",
        required: ["locator", "description"],
        properties: {
            locator: {
                type: "string",
                minLength: 1,
            },
            description: {
                type: "string",
                minLength: 1,
            },
        },
    };

    protected doParse() {
        this.component = ComponentsApiTransformer.fromApi(this.req);
    }    
}