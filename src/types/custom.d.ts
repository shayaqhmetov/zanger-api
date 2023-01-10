import { IUserJWTPayload } from "./";
declare namespace Express {
    export interface Request {
        user?: IUserJWTPayload;
    }
}

