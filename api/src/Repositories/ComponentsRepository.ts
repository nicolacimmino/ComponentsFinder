import { Component } from "../Models/Component";
import { DynamoDbClientWrapper } from "../Aws/DynamoDBClientWrapper";

const COMPONENTS_TABLE = process.env.COMPONENTS_TABLE;

const dynamoDbClientWrapper = new DynamoDbClientWrapper();

export class ComponentsRepository {
    public static async getAll(start: string, filter: string) {
        var itemsToReturn = new Array();
        var lastScanLocator = start;
        

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

            const { Items, LastEvaluatedKey } = await dynamoDbClientWrapper.scan(params).promise();

            lastScanLocator = LastEvaluatedKey ? LastEvaluatedKey.locator : null;

            itemsToReturn = itemsToReturn.concat(Items);
        } while (lastScanLocator && itemsToReturn.length < 2)

        return { Items: itemsToReturn, lastScanLocator: lastScanLocator };
    }

    public static async getByLocator(locator: string) {
        const { Item } = await dynamoDbClientWrapper.get({
            TableName: COMPONENTS_TABLE,
            Key: {
                locator: locator,
            },
        }).promise();

        return Item;
    }

    public static async addComponent(component: Component) {
        const { Item } = await dynamoDbClientWrapper.put({
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