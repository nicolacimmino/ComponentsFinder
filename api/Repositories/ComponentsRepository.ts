const AWS = require("aws-sdk");

const COMPONENTS_TABLE = process.env.COMPONENTS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

export class ComponentsRepository {
    public static async getByLocator(locator: string) {
        const { Item } = await dynamoDbClient.get({
            TableName: COMPONENTS_TABLE,
            Key: {
                locator: locator,
            },
        }).promise();

        return Item;
    }

}