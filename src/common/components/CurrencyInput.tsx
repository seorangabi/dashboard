import React, { type ChangeEvent } from "react";
import { Input } from "./ui/input";

type Props = Omit<
	React.ComponentProps<"input">,
	"onChange" | "value" | "type"
> & {
	value: number;
	onChange: (value: number) => void;
};

const CurrencyInput = React.forwardRef<HTMLInputElement, Props>(
	({ onChange, value, ...props }, ref) => {
		const formatNumber = (num: number): string => {
			if (!num) return "";
			return num.toLocaleString("id-ID");
		};

		const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
			// Remove currency symbol and commas for processing
			const numericValue = e.target.value.replace(/[^\d]/g, "");

			// Parse the numeric string to a number
			const numberValue = Number.parseInt(numericValue, 10);

			// Call onChange with the number value
			onChange?.(Number.isNaN(numberValue) ? 0 : numberValue);
		};

		return (
			<Input
				type="text"
				value={value === 0 ? "" : formatNumber(value)}
				onChange={handleInputChange}
				ref={ref}
				{...props}
			/>
		);
	},
);
CurrencyInput.displayName = "Input";

export default CurrencyInput;
