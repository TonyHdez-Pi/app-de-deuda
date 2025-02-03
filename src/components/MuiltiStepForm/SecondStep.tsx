import PaymentInput from "../PaymentInput";
import FormWrapper from "./FormWrapper";
import { OnlyPaymenData } from "@/types";
import { ErrorMessages } from "@/types";
import { ValidInputs } from "@/types";
import { faMoneyBill1 } from "@fortawesome/free-regular-svg-icons";

type SecondStepProps = OnlyPaymenData & {
	updateFields: (fields: Partial<OnlyPaymenData>) => void;
	handleBlur: (fieldName: string, value: number) => void;
	isValidInput: ValidInputs;
	errorMessage: ErrorMessages;
};

export default function SecondStep({
	quantity,
	payed,
	updateFields,
	handleBlur,
	isValidInput,
	errorMessage,
}: SecondStepProps) {
	console.log(quantity, payed);
	return (
		<FormWrapper title="Cantidad">
			<PaymentInput
				onblur={(event) => handleBlur("quantity", Number(event.target.value))}
				isValidInput={isValidInput.quantity}
				errorMessage={errorMessage.quantity}
				onchange={(event) =>
					updateFields({ quantity: Number(event.target.value) })
				}
				value={quantity}
				required
				icon={faMoneyBill1}
				inputType="number"
				title="Cantidad?"
			/>
			<PaymentInput
				onblur={(event) => handleBlur("payed", Number(event.target.value))}
				isValidInput={isValidInput.payed}
				errorMessage={errorMessage.payed}
				onchange={(event) =>
					updateFields({ payed: Number(event.target.value) })
				}
				value={payed}
				icon={faMoneyBill1}
				inputType="number"
				title="Ya se pago?"
			/>
		</FormWrapper>
	);
}
