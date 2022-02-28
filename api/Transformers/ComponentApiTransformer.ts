
export class ComponentsApiTransformer {  
    public static toApi(data) {
        return {
            locator: data.locator,
            category: data.category,
            description: data.description
        }
    }
}

