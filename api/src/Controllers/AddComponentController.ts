import { ComponentsRepository } from "../Repositories/ComponentsRepository";
import { AddComponentRequest } from "../Requests/AddComponentRequest";
import { ComponentsApiTransformer } from "../Transformers/ComponentApiTransformer";
import { Controller } from "./Controller";

export class AddComponentController extends Controller {
  protected request: AddComponentRequest;

  public constructor(request: AddComponentRequest, res) {
    super(res);
    this.request = request;
  }


  protected async doInvoke() {
    await ComponentsRepository.addComponent(this.request.component);

    this.success(ComponentsApiTransformer.toApi(this.request.component));
  }
}