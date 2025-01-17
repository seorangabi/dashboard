import axios, { AxiosError } from "axios";
import type { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import queryString from "query-string";

let lastSession: Session | null = null;

const apiInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

apiInstance.interceptors.request.use(async (config) => {
	if (config.headers.Authorization) return config;

	lastSession = await getSession();

	if (lastSession?.accessToken) {
		config.headers.Authorization = `Bearer ${lastSession.accessToken}`;
	} else {
		config.headers.Authorization = undefined;
	}

	return config;
});

apiInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error instanceof AxiosError) {
			if (error.response?.status === 401) {
				signOut();
			}
		}
		return Promise.reject(error);
	},
);

export default apiInstance;
