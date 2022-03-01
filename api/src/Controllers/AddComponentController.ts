import { ComponentsRepository } from "../Repositories/ComponentsRepository";
import { ComponentsApiTransformer } from "../Transformers/ComponentApiTransformer";
import { Controller } from "./Controller";

export class AddComponentController extends Controller {
    public async invoke() {
        const component = ComponentsApiTransformer.fromApi(this.req);

        await ComponentsRepository.addComponent(component);

        this.success(ComponentsApiTransformer.toApi(component));
    }
}