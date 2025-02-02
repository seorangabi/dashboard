import { generateErrorMessage } from "@/common/lib/utils";
import useVerifyGoogleAccountMutation from "@/common/mutations/useVerifyGoogleAccountMutation";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginGoogleVerificationPage = () => {
	const router = useRouter();
	const session = useSession();
	const query = router.query;
	const { mutate, isPending, error } = useVerifyGoogleAccountMutation({});

	const loading = isPending || !router.isReady || session.status === "loading";

	const errorMessage = error ? generateErrorMessage(error) : null;

	useEffect(() => {
		if (!session?.data?.user?.email || !query.secret) return;

		mutate(
			{
				email: session?.data?.user?.email as string,
				secret: query.secret as string,
			},
			{
				onSuccess: () => {
					router.push("/admin/login/google");
				},
			},
		);
	}, [session?.data?.user?.email, query.secret]);

	return (
		<div className="h-screen flex justify-center items-center flex-col">
			<>
				{loading && (
					<>
						<LoaderCircle className="animate-spin" />
						<span>Loading</span>
					</>
				)}

				{errorMessage && <span>{errorMessage}</span>}

				{router.isReady && !query.secret && <span>Secret is required</span>}
			</>
		</div>
	);
};

export default LoginGoogleVerificationPage;
