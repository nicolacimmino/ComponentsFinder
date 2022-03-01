import { Component } from "../Models/Component";
import { ComponentsApiTransformer } from "../Transformers/ComponentApiTransformer";
import { ApiRequest } from "./ApiRequest";

export class AddComponentRequest extends ApiRequest {
    public component: Component;

    protected parse() {        
        this.component = ComponentsApiTransformer.fromApi(this.req);
    }
}