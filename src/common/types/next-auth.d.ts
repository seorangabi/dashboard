import type { DefaultSession } from "next-auth";

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "next-auth" {
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */
	interface User {
		id: string;
		role: string;
		accessToken?: string;
		accessTokenExpires?: number;
	}
	/**
	 * The shape of the account object returned in the OAuth providers' `account` callback,
	 * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
	 */
	// interface Account {}

	/**
	 * Returned by `useSession`, `auth`, contains information about the active session.
	 */
	interface Session {
		accessToken: string;
		user: {
			id: string;
			role: string;
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession["user"];
	}
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		id: string;
		role: string;
		accessToken: string;
	}
}
