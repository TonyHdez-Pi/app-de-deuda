import { ChangeEvent, FocusEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";

type PaymentInputProps = {
	title: string;
	inputType: string;
	icon: IconDefinition;
	required?: true;
	value: string | number | undefined;
	isValidInput?: boolean;
	errorMessage?: string | undefined;
	onchange: (event: ChangeEvent<HTMLInputElement>) => void;
	onblur: (event: FocusEvent<HTMLInputElement, Element>) => void;
};

export default function PaymentInput({
	title,
	inputType,
	icon,
	required,
	value,
	isValidInput,
	errorMessage,
	onchange,
	onblur,
}: PaymentInputProps) {
	return (
		<div className="w-3/4 relative overflow-visible">
			<h3 className="m-0 mb-1 font-normal text-[#6d7483] ">{title}</h3>
			<label
				htmlFor={title}
				className="rounded-md flex h-12 border border-solid border-[#99A3BA]"
			>
				<input
					onBlur={onblur}
					onChange={onchange}
					value={value}
					required={required}
					type={inputType}
					name={title}
					id={title}
					placeholder={title}
					className="w-full border-none rounded-md pl-12 peer"
				/>
				<span
					className={`flex justify-center items-center w-[50px] h-12 text-[#99A3BA] font-semibold mr-1 bg-[#CDD9ED] peer-focus:bg-[#678EFE] peer-focus:text-[#fff] peer-focus:transition-all peer-focus:ease-in peer-focus:duration-200 absolute rounded-l-md ${
						isValidInput
							? `bg-[#CDD9ED]`
							: `bg-red-600 text-white border border-red-600`
					}`}
				>
					{isValidInput ? (
						<FontAwesomeIcon icon={icon} />
					) : (
						<FontAwesomeIcon icon={faRectangleXmark} />
					)}
				</span>
			</label>
			{!isValidInput && (
				<span className="font-thin text-red-600 block mt-1 text-xs text-right pr-1">
					{errorMessage}
				</span>
			)}
		</div>
	);
}
