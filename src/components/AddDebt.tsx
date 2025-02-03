import { createPortal } from "react-dom";
import { useMultiSteps } from "@/hooks/useMultiSteps";
import FirstStep from "./MuiltiStepForm/FirstStep";
import SecondStep from "./MuiltiStepForm/SecondStep";
import ThirdStep from "./MuiltiStepForm/ThirdStep";
import { FormEvent, useState } from "react";
import { FormData } from "@/types";
import { useValidations } from "@/hooks/useValidations";
import { ValidInputs } from "@/types";
import { ErrorMessages } from "@/types";

type AddDebtProps = {
	isOpen: boolean;
	openClose: () => void;
};

// esto podria poder estar en su propio archivo

const INITIAL_DATA = {
	creditor: "",
	deutor: "",
	quantity: 0,
	payed: 0,
};

const VALID_INPUTS_INITIAL_DATA = {
	creditor: true,
	deutor: true,
	quantity: true,
	payed: true,
};

const ERROR_MESSAGES_INITIAL_DATA = {
	creditor: "",
	deutor: "",
	quantity: "",
	payed: "",
};

export default function AddDebt({ isOpen, openClose }: AddDebtProps) {
	// faking states
	const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
	const [isValid, setIsValid] = useState<ValidInputs>(
		VALID_INPUTS_INITIAL_DATA
	);
	const [errorMessages, setErrorMessages] = useState<ErrorMessages>(
		ERROR_MESSAGES_INITIAL_DATA
	);

	// la validacion que mas
	const { nameValidation, payedValidation, quantityValidation } =
		useValidations();

	function updateFields(fields: Partial<FormData>) {
		setFormData((prev) => {
			return { ...prev, ...fields };
		});
	}

	function onSubmit(event: FormEvent) {
		event.preventDefault();
		if (!isLastStep) return nextStep();
		setFormData(INITIAL_DATA);
		resetCounter();
		openClose();
	}

	const handleBlur = (fieldName: string, value: string | number) => {
		let validationResults: { isValid: boolean; errorMessage: string };
		switch (fieldName) {
			case "creditor":
				validationResults = nameValidation(value as string);
				break;
			case "deutor":
				validationResults = nameValidation(value as string);
				break;
			case "quantity":
				validationResults = quantityValidation(value as number);
				break;
			case "payed":
				validationResults = payedValidation(value as number, formData.quantity);
				break;
			default:
				break;
		}
		setIsValid((prevValues) => ({
			...prevValues,
			[fieldName]: validationResults.isValid,
		}));
		setErrorMessages((prevErr) => ({
			...prevErr,
			[fieldName]: validationResults.errorMessage,
		}));
	};

	const {
		steps,
		step,
		currentStep,
		isFirstStep,
		isLastStep,
		prevStep,
		nextStep,
		resetCounter,
	} = useMultiSteps([
		<FirstStep
			{...formData}
			errorMessage={errorMessages}
			isValidInput={isValid}
			handleBlur={handleBlur}
			updateFields={updateFields}
		/>,
		<SecondStep
			{...formData}
			errorMessage={errorMessages}
			isValidInput={isValid}
			handleBlur={handleBlur}
			updateFields={updateFields}
		/>,
		<ThirdStep
			creditor={formData.creditor}
			deutor={formData.deutor}
			quantity={formData.quantity}
			payed={formData.payed}
		/>,
	]);

	function buttonDisabled(): boolean {
		let disabled: boolean = true;
		if (currentStep === 0) {
			disabled = !(isValid.creditor && isValid.deutor);
		}
		if (currentStep === 1) {
			disabled = !(isValid.quantity && isValid.payed);
		}
		if (currentStep === 2) {
			disabled = false;
		}
		return disabled;
	}
	return createPortal(
		isOpen && (
			<form
				onSubmit={onSubmit}
				className="absolute left-1/2 top-1/2 -translate-x-1/2	 -translate-y-1/2 z-10 my-auto bg-slate-400 flex flex-col items-center gap-4 w-[360px] h-[460px] rounded-md shadow-lg"
			>
				<div className="absolute top-2 right-2">
					{currentStep + 1}/{steps.length}
				</div>
				<button onClick={openClose} className="absolute left-0">
					X
				</button>
				{step}
				<div className="flex gap-6">
					{!isFirstStep && (
						<button
							type="button"
							onClick={prevStep}
							className="rounded-md px-3 bg-transparent border border-slate-50 shadow-xl py-2"
						>
							Anterior
						</button>
					)}
					<button
						disabled={buttonDisabled()}
						type="submit"
						className="rounded-md px-3 bg-transparent border border-slate-50 shadow-xl py-2"
					>
						{isLastStep ? "Terminar" : "Siguiente"}
					</button>
				</div>
			</form>
		),
		document.body
	);
}
