import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiInstance from "../lib/axios";

export type Res = {
	ip: string;
	is_eu: boolean;
	city: string;
	region: string;
	region_code: string;
	region_type: string;
	country_name: string;
	country_code: string;
	continent_name: string;
	continent_code: string;
	latitude: number;
	longitude: number;
	postal: string;
	calling_code: string;
	flag: string;
	emoji_flag: string;
	emoji_unicode: string;
	asn: {
		asn: string;
		name: string;
		domain: unknown;
		route: string;
		type: string;
	};
	languages: Array<{
		name: string;
		native: string;
		code: string;
	}>;
	currency: {
		name: string;
		code: string;
		symbol: string;
		native: string;
		plural: string;
	};
	time_zone: {
		name: string;
		abbr: string;
		offset: string;
		is_dst: boolean;
		current_time: string;
	};
	threat: {
		is_tor: boolean;
		is_icloud_relay: boolean;
		is_proxy: boolean;
		is_datacenter: boolean;
		is_anonymous: boolean;
		is_known_attacker: boolean;
		is_known_abuser: boolean;
		is_threat: boolean;
		is_bogon: boolean;
		blocklists: Array<unknown>;
	};
	count: string;
};

type UseMyApiQueryProps = {
	query?: {};
	options?: Omit<UseQueryOptions<Res>, "queryKey">;
};

const useMyApiQuery = ({ query, options }: UseMyApiQueryProps = {}) => {
	const queryResult = useQuery({
		...options,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		queryKey: ["my-api", query],
		queryFn: async () => {
			const res = await apiInstance.get("https://api.ipdata.co", {
				params: {
					"api-key": process.env.NEXT_PUBLIC_IP_DATA_API_KEY,
				},
			});
			return res.data;
		},
	});

	return queryResult;
};

export default useMyApiQuery;
