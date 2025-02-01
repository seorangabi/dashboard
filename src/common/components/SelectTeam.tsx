import { type FC, useMemo, useState } from "react";
import useTeamListQuery from "../queries/useTeamListQuery";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/common/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/common/components/ui/command";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";

const SelectTeam: FC<{
	value: string | undefined;
	onChange: (value: string | undefined) => void;
	popoverContentClassName?: string;
}> = ({ value, onChange, popoverContentClassName }) => {
	const [search, setSearch] = useState<string>("");
	const [open, setOpen] = useState(false);
	const { data } = useTeamListQuery({});

	const teams = useMemo(() => {
		if (!data?.data?.docs.length) return [];

		const docs = data.data.docs;

		const filteredDocs = docs.filter((team) =>
			team.name.toLowerCase().includes(search.toLowerCase()),
		);

		return filteredDocs.map((team) => ({
			value: team.id,
			label: team.name,
		}));
	}, [data?.data?.docs, search]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between w-full"
				>
					{value
						? teams.find((team) => team.value === value)?.label
						: "Select a team..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={cn("w-[370px] p-0", popoverContentClassName)}>
				<Command shouldFilter={false}>
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder="Search team..."
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>No team found.</CommandEmpty>
						<CommandGroup>
							{teams.map((team) => (
								<CommandItem
									key={team.value}
									value={team.value}
									onSelect={(currentValue) => {
										onChange(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{team.label}
									<Check
										className={cn(
											"ml-auto",
											value === team.value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default SelectTeam;
