import { HistoryData } from "@/types";

type HistoryDataProps = HistoryData;

export default function HistoryCard({
	amount,
	date,
	method,
}: HistoryDataProps) {
	return (
		<article className="flex w-[380px] h-[145px] rounded-xl bg-slate-200 shadow-sm my-2 mx-1">
			<div className="h-full w-1/3 bg-transparent ">
				<img
					src="/comprobante.jpg"
					alt="comprobante"
					className="object-contain w-full h-full m-auto hover:cursor-pointer "
				/>
			</div>
			<div className="w-full max-h-[100px] m-auto">
				<p className="m-1">
					<span className="font-semibold">Cantidad: </span>${amount}
				</p>
				<p className="m-1">
					<span className="font-semibold">Fecha: </span>
					{date}
				</p>
				<p className="m-1">
					<span className="font-semibold">Tipo de pago: </span>
					{method}
				</p>
			</div>
		</article>
	);
}
