import FormInput from "./FormInput";

export default function LogIn() {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<h2>Ingresar</h2>
			<form className="flex flex-col justify-center items-center gap-8 h-96 w-[380px] sm:w-[600px] rounded-lg border-solid border-[#99A3BA]">
				<FormInput title="Correo" inputType="text" icon="icon" />
				<FormInput title="Contrasena" inputType="password" icon="icon" />
				<button
					type="submit"
					className="w-2/4 py-3 rounded-xl border-none bg-gradient-to-r from-green-500 to-green-400 text-white font-bold  cursor-pointer"
				>
					Ingresar
				</button>
			</form>
		</div>
	);
}
