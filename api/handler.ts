import { default as express } from "express";
import { default as serverless } from "serverless-http";
import { GetComponentController } from "./src/Controllers/GetComponentController";
import { AddComponentController } from "./src/Controllers/AddComponentController";
import { GetComponentRequest } from "./src/Requests/GetComponentRequest";
import { AddComponentRequest } from "./src/Requests/AddComponentRequest";

const app = express();

app.use(express.json());

app.get("/components/:locator", async function (req, res) {
  (new GetComponentController(new GetComponentRequest(req), res)).invoke();  
});

app.post("/components", async function (req, res) {
  (new AddComponentController(new AddComponentRequest(req), res)).invoke();
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
