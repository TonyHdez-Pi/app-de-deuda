import FormWrapper from "./FormWrapper";
import { UserAndPaymnetData } from "@/types";

type ThirdStepProps = UserAndPaymnetData;

export default function ThirdStep({
	creditor,
	deutor,
	quantity,
	payed,
}: ThirdStepProps) {
	return (
		<FormWrapper title="Check">
			<div className="">Acreedor: {creditor}</div>
			<div className="">Dedor: {deutor}</div>
			<div className="">Cantidad: {quantity}</div>
			{quantity && <div className="">Pagado: {payed}</div>}
		</FormWrapper>
	);
}
