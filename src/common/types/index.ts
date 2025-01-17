export type DateTime = string;
export type ApiResponse<T> = {
	data: T;
};

export type Pagination = {
	hasNext: boolean;
	hasPrev: boolean;
};
