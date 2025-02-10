const nameRegex = new RegExp(/^[A-Za-z]{3,}$/);
// const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
// const passwordRegex = {
// 	oneLetter: /[A-Za-z]/,
// 	oneNumber: /\d/,
// 	oneSpecialCharacter: /[!@#$%^&*]/,
// };
type ValidationFunction = {
	isValid: boolean;
	errorMessage: string;
};

export function useValidations() {
	function nameValidation(name: string): ValidationFunction {
		if (!nameRegex.test(name)) {
			return {
				isValid: false,
				errorMessage: "Escribe al menos 3 caracteres",
			};
		} else {
			return { isValid: true, errorMessage: "" };
		}
	}

	function quantityValidation(quantity: number): ValidationFunction {
		if (isNaN(quantity) || quantity <= 0) {
			return {
				isValid: false,
				errorMessage: "Cantidad no valida",
			};
		} else {
			return { isValid: true, errorMessage: "" };
		}
	}

	function payedValidation(
		payed: number,
		quantity: number
	): ValidationFunction {
		if (payed > quantity) {
			return {
				isValid: false,
				errorMessage: "Lo pagado no puede ser mayor a la deuda",
			};
		} else {
			if (isNaN(payed) || payed < 0) {
				return {
					isValid: false,
					errorMessage: "Cantidad no valida",
				};
			} else {
				return {
					isValid: true,
					errorMessage: "",
				};
			}
		}
	}

	function dateValidation(date: Date): ValidationFunction {
		const todaysDate = new Date();
		const dateToValidate = new Date(date);
		// se puede hacer este tipo de comparacion pues new Date calcula el tiempo en milisegundos desde
		// 1970! :o
		if (dateToValidate > todaysDate) {
			return {
				isValid: false,
				errorMessage: "La fecha no puede ser mayor a la de hoy",
			};
		} else {
			return {
				isValid: true,
				errorMessage: "",
			};
		}
	}

	function emailValidation() {}
	function passwordValidation() {}

	return {
		nameValidation,
		quantityValidation,
		payedValidation,
		emailValidation,
		passwordValidation,
		dateValidation,
	};
}
