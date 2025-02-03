type FormInputProps = {
	title: string;
	inputType: string;
	icon: string;
};

export default function FormInput({ title, inputType, icon }: FormInputProps) {
	return (
		<div className="w-3/4 relative ">
			<h3 className="m-0 mb-1 font-normal text-[#6d7483] ">{title}</h3>
			<label
				htmlFor="name"
				className="rounded-md flex h-12 border border-solid border-[#99A3BA]"
			>
				<input
					type={inputType}
					name={title}
					id={title}
					placeholder={title}
					className="w-full border-none rounded-md pl-20 sm:pl-28 peer"
				/>
				<span className="flex justify-center items-center w-1/4 h-12 text-[#99A3BA] font-semibold mr-1 bg-[#CDD9ED] peer-focus:bg-[#678EFE] peer-focus:text-[#fff] peer-focus:transition-all peer-focus:ease-in peer-focus:duration-200 absolute rounded-l-md">
					{icon}
				</span>
			</label>
		</div>
	);
}
