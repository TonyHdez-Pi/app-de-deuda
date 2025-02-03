import { createPortal } from "react-dom";
import CardSelector from "./CardSelector";
import PaymentInput from "./PaymentInput";
import FileDrop from "./FileDrop/FileDrop";
import {
	faUser,
	faMoneyBill1,
	faCalendar,
	faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { useValidations } from "@/hooks/useValidations";
import { useState } from "react";
import { ValidInputs } from "@/types";
import { ErrorMessages } from "@/types";
import { Options } from "@/types";

type AddDebtUserData = {
	creditor: string;
	quantity: number;
	date: string;
	payType: string;
	proof: File | null;
};

type PaymentInfo = Omit<ValidInputs, "payed" | "deutor"> & {
	date: boolean;
};
type PaymentErrorMessages = Omit<ErrorMessages, "payed" | "deutor"> & {
	date: string;
};

const INITIAL_DATA: AddDebtUserData = {
	creditor: "",
	quantity: 0,
	date: new Date().toISOString().split("T")[0],
	payType: "",
	proof: null,
};

const VALID_INPUTS_INITIAL_DATA: PaymentInfo = {
	creditor: true,
	quantity: true,
	date: true,
};
const ERROR_MESSAGES_INITAL_DATA: PaymentErrorMessages = {
	creditor: "",
	quantity: "",
	date: "",
};
const cardSelectionOptionsArray: Options[] = [
	{
		title: "Transferencia",
		icon: faPaperPlane,
		type: "transfer",
	},
	{
		title: "Efectivo",
		icon: faMoneyBill1,
		type: "cash",
	},
];

export default function AddPayment() {
	const [validInput, setValidInput] = useState<PaymentInfo>(
		VALID_INPUTS_INITIAL_DATA
	);
	const [error, setError] = useState<PaymentErrorMessages>(
		ERROR_MESSAGES_INITAL_DATA
	);
	const [formData, setFormData] = useState<AddDebtUserData>(INITIAL_DATA);
	const [typeSelected, setTypeSelected] = useState<string>("");
	const { quantityValidation, nameValidation, dateValidation } =
		useValidations();

	// typescript infiere el tipo de Date
	const handleBlur = (name: string, value: string | number | Date) => {
		let validationResults: { isValid: boolean; errorMessage: string };

		if (name === "quantity") {
			validationResults = quantityValidation(value as number);
		}

		if (name === "creditor") {
			validationResults = nameValidation(value as string);
		}

		if (name === "date") {
			validationResults = dateValidation(value as Date);
		}

		setValidInput((prev) => ({
			...prev,
			[name]: validationResults.isValid,
		}));

		setError((prev) => ({
			...prev,
			[name]: validationResults.errorMessage,
		}));
	};
	const handleChange = (name: string, value: string | number) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSelection = (type: string) => {
		setFormData((prevData) => ({
			...prevData,
			payType: type,
		}));
		setTypeSelected(type);
	};

	const handleFileDrop = (file: File) => {
		setFormData((prevData) => ({
			...prevData,
			proof: file,
		}));
	};
	console.log(formData);
	return (
		<section className="m-auto bg-slate-200 h-[680px] w-[350px] sm:h-[700px] sm:w-[600px] rounded-md">
			<button className="border-none">X</button>
			<form
				id="addPaymentForm"
				className="w-full h-full flex flex-col justify-center -mt-6 items-center gap-5"
				action=""
			>
				{/* Cantidad */}
				<PaymentInput
					required={true}
					errorMessage={error.quantity}
					isValidInput={validInput.quantity}
					value={formData.quantity}
					onblur={(event) => handleBlur("quantity", event.target.value)}
					onchange={(event) => handleChange("quantity", event.target.value)}
					title="Cantidad"
					icon={faMoneyBill1}
					inputType="number"
				/>
				{/* Acreedor */}
				<PaymentInput
					required={true}
					errorMessage={error.creditor}
					isValidInput={validInput.creditor}
					value={formData.creditor}
					onblur={(event) => handleBlur("creditor", event.target.value)}
					onchange={(event) => handleChange("creditor", event.target.value)}
					title="Usuario"
					icon={faUser}
					inputType="text"
				/>
				{/* Fecha */}
				{/* Arreglar la validacion, no funciona cuando pones fecha mas grande */}
				<PaymentInput
					isValidInput={validInput.date}
					errorMessage={error.date}
					value={formData.date}
					onblur={(event) => handleBlur("date", event.target.value)}
					onchange={(event) => handleChange("date", event.target.value)}
					title="Fecha"
					icon={faCalendar}
					inputType="date"
				/>
				<div className="flex w-full gap-10 sm:gap-32 justify-center">
					{cardSelectionOptionsArray.map(({ icon, title, type }: Options) => (
						<CardSelector
							key={type}
							handleSelection={() => handleSelection(type)}
							isSelected={typeSelected === type}
							icon={icon}
							title={title}
						/>
					))}
				</div>
				{/* Cambiar a drag and drop*/}
				<FileDrop handleDrop={handleFileDrop} />
			</form>
		</section>
	);
}
createPortal(<AddPayment />, document.body);
