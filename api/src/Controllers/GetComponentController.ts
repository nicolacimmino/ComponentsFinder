import { ComponentsRepository } from "../Repositories/ComponentsRepository";
import { ComponentsApiTransformer } from "../Transformers/ComponentApiTransformer";
import { Controller } from "./Controller";

export class GetComponentController extends Controller {
    public async invoke() {
        try {
            const component = await ComponentsRepository.getByLocator(this.req.params.locator);
          
            if (!component) {      
                this.notFound();

                return;
            }  
              
            this.success(ComponentsApiTransformer.toApi(component));
            
          } catch (error) {
            this.internalError(error);
          }
    }
}