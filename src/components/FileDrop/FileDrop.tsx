import { ChangeEvent, DragEvent, useState } from "react";

type FileDropProps = {
	handleDrop: (file: File) => void;
};

export default function FileDrop({ handleDrop }: FileDropProps) {
	const onHandleDrop = (event: DragEvent<HTMLElement>) => {
		event.preventDefault();
		// checa si el archivo es mayor a 2mb
		if (!(event.dataTransfer.files[0].size / (1024 * 1024) > 2)) {
			handleDrop(event.dataTransfer.files[0]);
			setFile(event.dataTransfer.files[0]);
		}
	};

	const onChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const input = (event.target as HTMLInputElement).files?.[0];
		if (input) {
			handleDrop(input);
			setFile(input);
		}
	};

	const [file, setFile] = useState<File>();

	return (
		// onDragOver y onDrop ambas tienen que tener el preventDefault
		// si no solo se abre el archivo en el navegador
		<section
			onDragOver={(event) => event.preventDefault()}
			id="dropZone"
			onDrop={onHandleDrop}
			className="w-3/4 h-[150px] sm:h-[180px] border-dashed bg-slate-300 rounded-md flex flex-col justify-center items-center gap-3"
		>
			{file ? (
				<section className="flex flex-row-reverse gap-3">
					<button
						onClick={() => setFile(undefined)}
						className="border-none bg-transparent cursor-pointer"
					>
						X
					</button>
					<p>{file.name}</p>
				</section>
			) : (
				<>
					<label
						className="rounded-md text-sm bg-slate-400 font-semibold py-3 px-2 hover:cursor-pointer"
						htmlFor="files"
					>
						Agregar Imagen
					</label>
					<p className="m-0 p-2 text-xs text-gray-600">O arrastra aqui</p>
					<input
						id="files"
						type="file"
						className="hidden"
						onChange={onChangeEvent}
					/>
				</>
			)}
		</section>
	);
}
