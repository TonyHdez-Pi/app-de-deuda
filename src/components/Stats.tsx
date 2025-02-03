import DonutChart from "./DonutChart";
import { useState } from "react";
import AddDebt from "./AddDebt";

import type { DataType } from "@/types";

const paymentData: DataType[] = [
	{ name: "Pagado", value: 25000 },
	{ name: "Restante", value: 80000 },
];

export default function Stats() {
	const [openCloseModal, setOpenCloseModal] = useState<boolean>(false);

	function handleOpenClose() {
		setOpenCloseModal(!openCloseModal);
	}

	return (
		<>
			<section className="relative flex flex-col justify-center items-center w-full h-full">
				<DonutChart width={500} height={500} data={paymentData} />
				<section className="relative -top-24 w-full flex flex-col">
					<button
						onClick={handleOpenClose}
						className="rounded-xl px-2 py-1 bg-slate-100 shadow-sm w-48 self-center mb-4"
					>
						Anadir pago
					</button>
					<section className="flex gap-10 sm:gap-32 w-full justify-center">
						<div>
							<h2 className="m-0 text-2xl">$24,400</h2>
							<span className="m-0 text-sm">Pagado</span>
						</div>
						<div>
							<h2 className="m-0 text-2xl">$70,000</h2>
							<span className="m-0 text-sm">Restante</span>
						</div>
					</section>
				</section>
			</section>
			<AddDebt openClose={handleOpenClose} isOpen={openCloseModal} />
		</>
	);
}
