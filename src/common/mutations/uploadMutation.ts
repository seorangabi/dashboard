import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import uploadService, { UploadBody, UploadResponse } from "../services/upload";

type UseUploadMutationProps = {
  options?: UseMutationOptions<UploadResponse, unknown, UploadBody>;
};

const useUploadMutation = ({ options }: UseUploadMutationProps) => {
  return useMutation({
    mutationFn: async (body) => {
      const res = await uploadService.upload({
        body: body,
      });

      return res.data;
    },
    ...options,
  });
};

export default useUploadMutation;
