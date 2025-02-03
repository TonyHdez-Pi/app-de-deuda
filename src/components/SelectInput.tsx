import { Options } from "@/types";
import { ChangeEvent, FocusEvent } from "react";

type SelectInputProps = {
	title: string;
	options: Options[];
	value: string;
	belongsToForm: string;
	onblur?: (event: FocusEvent<HTMLSelectElement, Element>) => void;
	onchange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectInput({
	title,
	options,
	value,
	belongsToForm,
	onblur,
	onchange,
}: SelectInputProps) {
	return (
		<div className="w-3/4 relative overflow-visible">
			<h3 className="m-0 mb-1 font-normal text-[#6d7483] ">{title}</h3>
			<label htmlFor={title} className="flex h-12 ">
				<select
					value={value}
					onBlur={onblur}
					onChange={onchange}
					form={belongsToForm}
					id={title}
					className="w-1/2 mx-auto bg-[#CDD9ED] border-[#99A3BA] rounded-md "
				>
					{options.map((option: Options) => (
						<option key={option.id} id={option.id} value={option.displayName}>
							{option.displayName}
						</option>
					))}
				</select>
			</label>
		</div>
	);
}
