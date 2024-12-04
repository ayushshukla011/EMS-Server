export interface IUser {
	id: string;
}

export interface IUserJWTPayload {
	id: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}
