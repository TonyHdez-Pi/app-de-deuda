import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CardSelectorProps = {
	title: string;
	icon: IconDefinition;
	isSelected: boolean;
	handleSelection: () => void;
};

export default function CardSelector({
	title,
	icon,
	isSelected,
	handleSelection,
}: CardSelectorProps) {
	return (
		<button
			type="button"
			onClick={handleSelection}
			className={`w-[110px] h-[130px] bg-[#CDD9ED]  shadow-md rounded-md hover:cursor-pointer hover:border-[#678EFE] hover:text-[#678EFE] ${
				isSelected ? `text-blue-700` : `text-slate-900`
			}`}
		>
			<div className="w-full h-full flex flex-col justify-center items-center gap-y-5 bg-transparent rounded-md">
				<FontAwesomeIcon size={"2x"} icon={icon} />
				{title}
			</div>
		</button>
	);
}
