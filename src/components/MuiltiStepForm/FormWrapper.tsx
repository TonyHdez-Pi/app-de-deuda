import { ReactNode } from "react";

type FormWrapperProps = {
	title: string;
	children: ReactNode;
};

export default function FormWrapper({ title, children }: FormWrapperProps) {
	return (
		<section className="w-full h-full flex flex-col justify-center items-center gap-3">
			<h2 className="text-center m-0 font-semibold">{title}</h2>
			<div className="flex flex-col gap-8">{children}</div>
		</section>
	);
}
