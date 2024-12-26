import { useRouter } from "next/router";

type Query = {
  teamId?: string;
  status?: string;
  page: string;
  pageSize: string;
};

const useMainPageQueryState = () => {
  const router = useRouter();

  const teamId = (router.query.teamId || undefined) as string | undefined;
  const status = (router.query.status || undefined) as string | undefined;
  const page = (router.query.page || "1") as string;
  const pageSize = (router.query.pageSize || "50") as string;

  return {
    query: {
      page,
      pageSize,
      teamId,
      status,
    },
    setQuery: (query: Partial<Query>) => {
      router.push({
        query: {
          ...query,
        },
      });
    },
  };
};

export default useMainPageQueryState;
