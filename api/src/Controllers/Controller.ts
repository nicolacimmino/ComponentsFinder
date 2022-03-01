import { ApiError } from "../Errors/ApiError";

export abstract class Controller {
    protected res;

    protected abstract doInvoke();

    public constructor(res) {
        this.res = res;
    }

    public async invoke() {
        try {
            await this.doInvoke();
        } catch (error) {
            if (error instanceof ApiError) {
                this.res.status(error.httpStatus).json(error.toApiFormat());
            }
            this.internalError(error);
        }
    }

    public success(data: any) {
        this.res.json(data);
    }

    public notFound() {
        this.res.status(404).json({ error: 'NOT_FOUND' });
    }

    public internalError(error: Error) {
        console.log(error);
        this.res.status(500).json({ error: 'INTERNAL' });
    }
}