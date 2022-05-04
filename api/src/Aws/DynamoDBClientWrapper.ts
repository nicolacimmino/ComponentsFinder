import AWS from "aws-sdk";
import { InternalApiError } from "../Errors/InternalApiError";


export class DynamoDbClientWrapper {
    private dynamoDbClient;

    static dynamoCount = 0;

    constructor() {
        this.dynamoDbClient = new AWS.DynamoDB.DocumentClient();
    }

    public scan(params) {
        this.countDynamoCall();

        return this.dynamoDbClient.scan(params);
    }

    public get(params) {
        this.countDynamoCall();

        return this.dynamoDbClient.get(params);
    }

    public put(params) {
        this.countDynamoCall();

        return this.dynamoDbClient.put(params);
    }

    private countDynamoCall() {
        DynamoDbClientWrapper.dynamoCount++;
        
        if (DynamoDbClientWrapper.dynamoCount > 0) {
            throw new InternalApiError("dynamo runaway");
        }
    }
}