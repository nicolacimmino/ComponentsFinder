
export abstract class ApiRequest {
    protected req;

    protected abstract parse();

    public constructor(req: any) {
        this.req = req;

        this.parse();
    }
}