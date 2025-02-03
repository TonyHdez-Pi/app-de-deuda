import PaymentInput from "../PaymentInput";
import FormWrapper from "./FormWrapper";
import { OnlyUserData } from "@/types";
import { ErrorMessages } from "@/types";
import { ValidInputs } from "@/types";
import { faUser } from "@fortawesome/free-regular-svg-icons";

type FirstStepProps = OnlyUserData & {
	updateFields: (fields: Partial<OnlyUserData>) => void;
	handleBlur: (fieldName: string, value: string | number) => void;
	isValidInput: ValidInputs;
	errorMessage: ErrorMessages;
};

export default function FirstStep({
	creditor,
	deutor,
	updateFields,
	handleBlur,
	isValidInput,
	errorMessage,
}: FirstStepProps) {
	return (
		<FormWrapper title="Deudor / Acreedor">
			<PaymentInput
				onblur={(event) => handleBlur("creditor", event.target.value)}
				isValidInput={isValidInput.creditor}
				errorMessage={errorMessage.creditor}
				onchange={(event) => updateFields({ creditor: event.target.value })}
				value={creditor}
				required
				icon={faUser}
				inputType="text"
				title="Acreedor"
			/>
			<PaymentInput
				onblur={(event) => handleBlur("deutor", event.target.value)}
				isValidInput={isValidInput.deutor}
				errorMessage={errorMessage.deutor}
				onchange={(event) => updateFields({ deutor: event.target.value })}
				value={deutor}
				required
				icon={faUser}
				inputType="text"
				title="Deudor"
			/>
		</FormWrapper>
	);
}
