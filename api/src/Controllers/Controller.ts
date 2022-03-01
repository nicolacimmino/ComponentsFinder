export class Controller {
    protected req;
    protected res;

    public constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    public success(data:any) {
        this.res.json(data);
    }
        
    public notFound() {
        this.res.status(404).json({ error: 'NOT_FOUND' });
    }

    public internalError(error:Error) {
        console.log(error);
        this.res.status(500).json({ error: 'INTERNAL' });
    }
}