import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import authService from "../services/auth";
import type {
	VerifyGoogleAccountBody,
	VerifyGoogleAccountResponse,
} from "../services/auth.type";

type UseVerifyGoogleAccountMutationProps = {
	options?: UseMutationOptions<
		VerifyGoogleAccountResponse,
		unknown,
		VerifyGoogleAccountBody
	>;
};

const useVerifyGoogleAccountMutation = ({
	options,
}: UseVerifyGoogleAccountMutationProps) => {
	return useMutation({
		mutationFn: async (body) => {
			const res = await authService.verifyGoogleAccount({
				body,
			});

			return res.data;
		},
		...options,
	});
};

export default useVerifyGoogleAccountMutation;
