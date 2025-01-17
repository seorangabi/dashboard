export type LoginBody = {
	username: string;
	password: string;
};
export type LoginResponse = {
	doc: {
		accessToken: string;
		accessTokenExpires: number;
		user: {
			id: string;
			username: string;
		};
	};
};

export type LoginGoogleBody = {
	email: string;
};
export type LoginGoogleResponse = {
	doc: {
		accessToken: string;
		accessTokenExpires: number;
		user: {
			id: string;
			username: string;
		};
	};
};

export type VerifyGoogleAccountBody = {
	email: string;
	secret: string;
};
export type VerifyGoogleAccountResponse = {
	message: string;
};
