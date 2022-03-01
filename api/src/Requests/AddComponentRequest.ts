import { Component } from "../Models/Component";
import { ComponentsApiTransformer } from "../Transformers/ComponentApiTransformer";
import { ApiRequest } from "./ApiRequest";

export class AddComponentRequest extends ApiRequest {
    public component: Component;

    protected doParse() {        
        this.component = ComponentsApiTransformer.fromApi(this.req);
    }

    protected doValidate() {
        // TODO: validate        
    }        
}