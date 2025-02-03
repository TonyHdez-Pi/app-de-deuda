import Stats from "@components/Stats";
import HistoryCard from "./components/HistoryCard";
import type { HistoryData } from "./types";
import { historydata } from "./data/historydata";
import AddPayment from "./components/AddPayment";
import AddDebt from "./components/AddDebt";
function App() {
	return (
		<main className="h-screen w-screen flex flex-col sm:flex-row">
			<AddPayment />
			{/* <section className="h-1/2 w-full sm:w-1/2 sm:h-full">
				<Stats />
			</section>
			<section className="h-1/2 w-full sm:w-1/2 sm:h-full">
				<h2>Historial de pagos</h2>
				<div className="h-full sm:flex sm:flex-wrap overflow-scroll">
					{historydata.map((data: HistoryData) => (
						<HistoryCard
							amount={data.amount}
							date={data.date}
							method={data.method}
							key={data.date}
						/>
					))}
				</div>
			</section> */}
		</main>
	);
}

export default App;
