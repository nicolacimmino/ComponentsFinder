import { Component } from "../Models/Component";

const AWS = require("aws-sdk");

const COMPONENTS_TABLE = process.env.COMPONENTS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

export class ComponentsRepository {

    public static async getAll(start: string, filter: string) {
        let params: any = {
            TableName: COMPONENTS_TABLE,
            Limit: 2,
        };

        if (start) {
            params.ExclusiveStartKey = {
                locator: start
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

        const { Items, LastEvaluatedKey } = await dynamoDbClient.scan(params).promise();

        return { Items, LastEvaluatedKey };
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