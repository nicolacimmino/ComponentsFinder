import { Component } from "../Models/Component";
import { ComponentsRepository } from "../Repositories/ComponentsRepository";
import { GetComponentsRequest } from "../Requests/GetComponentsRequest";
import { ComponentsApiTransformer } from "../Transformers/ComponentApiTransformer";
import { Controller } from "./Controller";

export class GetComponentsController extends Controller {
  protected request: GetComponentsRequest;

  public constructor(request: GetComponentsRequest, res) {
    super(res);
    this.request = request;
  }


  protected async doInvoke() {

    const queryResult = await ComponentsRepository.getAll(this.request.start, this.request.filter);

    let result: Component[] = [];

    for (const component of queryResult.Items) {
      result.push(ComponentsApiTransformer.toApi(component));
    };

    var nextLink = "";
    if (queryResult.lastScanLocator) {
      nextLink = "/components/?start=" + queryResult.lastScanLocator +
        "&filter=" + (this.request.filter || "")
    }

    this.successPaginated(result, nextLink);
  }
}