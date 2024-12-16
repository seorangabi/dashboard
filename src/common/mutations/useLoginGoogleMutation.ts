import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import authService from "../services/auth";
import { LoginGoogleBody, LoginGoogleResponse } from "../services/auth.type";

type UseLoginGoogleMutationProps = {
  options?: UseMutationOptions<LoginGoogleResponse, unknown, LoginGoogleBody>;
};

const useLoginGoogleMutation = ({ options }: UseLoginGoogleMutationProps) => {
  return useMutation({
    mutationFn: async (body) => {
      const res = await authService.loginGoogle({
        body,
      });

      return res.data;
    },
    ...options,
  });
};

export default useLoginGoogleMutation;
