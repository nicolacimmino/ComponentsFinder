
export class ComponentsApiTransformer {
    public static toApi(data) {
        const { locator, category, description } = data;

        return {
            locator,
            category,
            description
        }
    }

    public static fromApi(req) {
        const { locator, category, description } = req.body;

        return {
            locator,
            category,
            description
        }
    }
}

