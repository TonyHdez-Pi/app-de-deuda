import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type HistoryData = {
	amount: number;
	method: string;
	date: string;
};

export type DataType = {
	name: string;
	value: number;
};

export type FormData = {
	creditor: string;
	deutor: string;
	quantity: number;
	payed?: number;
};

// Multistep Form types

export type OnlyUserData = Omit<FormData, "quantity" | "payed">;

export type OnlyPaymenData = Omit<FormData, "creditor" | "deutor">;

export type UserAndPaymnetData = FormData;

export type ErrorMessages = {
	creditor?: string;
	deutor?: string;
	quantity?: string;
	payed?: string;
};

export type ValidInputs = {
	creditor: boolean;
	deutor: boolean;
	quantity: boolean;
	payed: boolean;
};

// Select input types

export type Options = {
	title: string;
	icon: IconDefinition;
	type: string;
};
