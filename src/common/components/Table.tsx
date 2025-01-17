import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	pagination?: {
		page: number;
		pageSize: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		onNext: () => void;
		onPrev: () => void;
	};
};

const DataTable = <TData, TValue>({
	columns,
	data,
	isLoading,
	pagination,
}: DataTableProps<TData, TValue>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
										style={{ width: `${header.getSize()}px` }}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{isLoading && (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Loading...
							</TableCell>
						</TableRow>
					)}
					{!!table.getRowModel().rows?.length &&
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}

					{!isLoading && !table.getRowModel().rows?.length && (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{!!pagination && !(pagination?.page === 1 && !pagination.hasNextPage) && (
				<Pagination className="mb-3 border-t pt-3">
					<PaginationContent>
						<PaginationItem>
							<Button
								variant="ghost"
								size="sm"
								disabled={!pagination.hasPreviousPage}
								onClick={pagination.onPrev}
							>
								<ChevronLeft className="h-4 w-4" />
								Prev
							</Button>
						</PaginationItem>
						<PaginationItem>
							<Button variant="ghost" size="sm">
								{pagination.page}
							</Button>
						</PaginationItem>
						<PaginationItem>
							<Button
								variant="ghost"
								size="sm"
								disabled={!pagination.hasNextPage}
								onClick={pagination.onNext}
							>
								Next
								<ChevronRight className="h-4 w-4" />
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</div>
	);
};

export default DataTable;
