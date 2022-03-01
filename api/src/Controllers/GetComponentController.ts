import { ComponentsRepository } from "../Repositories/ComponentsRepository";
import { GetComponentRequest } from "../Requests/GetComponentRequest";
import { ComponentsApiTransformer } from "../Transformers/ComponentApiTransformer";
import { Controller } from "./Controller";

export class GetComponentController extends Controller {
  protected request: GetComponentRequest;

    public constructor(request: GetComponentRequest, res) {
      super(res);          
      this.request = request;        
    }


  protected async doInvoke() {    
    // TODO: find a way to move to base class.
    this.request.parse();

    const component = await ComponentsRepository.getByLocator(this.request.locator);

    if (!component) {
      this.notFound();

      return;
    }

    this.success(ComponentsApiTransformer.toApi(component));
  }
}