import { default as express } from "express";
import { default as serverless } from "serverless-http";
import { GetComponentController } from "./src/Controllers/GetComponentController";
import { AddComponentController } from "./src/Controllers/AddComponentController";
import { GetComponentRequest } from "./src/Requests/GetComponentRequest";
import { AddComponentRequest } from "./src/Requests/AddComponentRequest";
import { ValidationErrorMiddleware } from "./src/Middleware/ValidationErrorMiddleware";
import { GetComponentsRequest } from "./src/Requests/GetComponentsRequest";
import { GetComponentsController } from "./src/Controllers/GetComponentsController";
const { Validator } = require("express-json-validator-middleware");

const { validate } = new Validator();

const app = express();

app.use(express.json());

app.get(
  "/components/:locator",
  validate({ params: GetComponentRequest.schema }),
  async function (req, res) {
    (new GetComponentController(new GetComponentRequest(req), res)).invoke();
  });

app.get(
  "/components/",
  validate({ params: GetComponentsRequest.schema }),
  async function (req, res) {
    (new GetComponentsController(new GetComponentsRequest(req), res)).invoke();
  });

app.post(
  "/components",
  validate({ body: AddComponentRequest.schema }),
  async function (req, res) {
    (new AddComponentController(new AddComponentRequest(req), res)).invoke();
  });

app.use(ValidationErrorMiddleware.handle);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
