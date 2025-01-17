import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { generateErrorMessage } from "@/common/lib/utils";
import useLoginGoogleMutation from "@/common/mutations/useLoginGoogleMutation";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LoginGooglePage = () => {
	const router = useRouter();
	const [secret, setSecret] = useState("");
	const { data, status, update } = useSession();
	const { isPending, mutate, error } = useLoginGoogleMutation({
		options: {},
	});

	const loading = isPending || status === "loading";

	const errorMessage = error ? generateErrorMessage(error) : null;

	useEffect(() => {
		if (!data?.user?.email) return;

		mutate(
			{
				email: data?.user?.email,
			},
			{
				onSuccess: async (res) => {
					console.log("res", res);
					await update({
						...data,
						accessToken: res.doc.accessToken,
					});
					router.push("/admin");
				},
			},
		);
	}, [data?.user?.email]);

	const verificationNeeded = errorMessage === "Verification needed";

	return (
		<div className="h-screen flex justify-center items-center flex-col">
			<>
				{loading && (
					<>
						<LoaderCircle className="animate-spin" />
						<span>Loading</span>
					</>
				)}

				{errorMessage && (
					<div>
						<span>{errorMessage}</span>

						{verificationNeeded && (
							<div>
								<Input
									value={secret}
									onInput={(event) => {
										setSecret(event.currentTarget.value);
									}}
								/>
								<Button
									className="mt-2"
									onClick={() => {
										router.push(`/admin/google-verification?secret=${secret}`);
									}}
								>
									Verify
								</Button>
							</div>
						)}
					</div>
				)}
			</>
		</div>
	);
};

export default LoginGooglePage;
