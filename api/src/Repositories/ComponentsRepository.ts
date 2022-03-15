import { InternalApiError } from "../Errors/InternalApiError";
import { Component } from "../Models/Component";

const AWS = require("aws-sdk");

const COMPONENTS_TABLE = process.env.COMPONENTS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

export class ComponentsRepository {
    public static async getAll(start: string, filter: string) {
        var itemsToReturn = new Array();
        var lastScanLocator = start;
        var dynamoCount = 0;

        do {
            let params: any = {
                TableName: COMPONENTS_TABLE,
                Limit: 2,
            };

            if (lastScanLocator) {
                params.ExclusiveStartKey = {
                    locator: lastScanLocator
                };
            }

            if (filter) {
                params.FilterExpression = "contains(#description, :filter)";
                params.ExpressionAttributeNames = {
                    "#description": "description"
                };
                params.ExpressionAttributeValues = {
                    ":filter": filter
                }
            }

            dynamoCount++;

            if (dynamoCount > 50) {
                throw new InternalApiError("dynamo runaway");
            }

            const { Items, LastEvaluatedKey } = await dynamoDbClient.scan(params).promise();

            lastScanLocator = LastEvaluatedKey ? LastEvaluatedKey.locator : null;

            itemsToReturn = itemsToReturn.concat(Items);
        } while (lastScanLocator && itemsToReturn.length < 2)

        return { Items: itemsToReturn, lastScanLocator: lastScanLocator };
    }

    public static async getByLocator(locator: string) {
        const { Item } = await dynamoDbClient.get({
            TableName: COMPONENTS_TABLE,
            Key: {
                locator: locator,
            },
        }).promise();

        return Item;
    }

    public static async addComponent(component: Component) {
        const { Item } = await dynamoDbClient.put({
            TableName: COMPONENTS_TABLE,
            Item: {
                locator: component.locator,
                category: component.category,
                description: component.description
            },
        }).promise();

        return Item;
    }
}