import { index } from "d3";
import { ReactElement, useState } from "react";

// Este hooks sirve para cambiar entre los pasos del multistep form que estoy haciendo para registrar
// una deuda.
// Recibe un arreglo de Componentes, eso significa ReactElement[]
export function useMultiSteps(steps: ReactElement[]) {
	// ahora creamos un estado que nos permite saber en que paso estamos.
	const [currentStep, setcurrentStep] = useState(0);
	// Esta funcion nos permite cambiar entre componentes, checando que nos nos pasemos del
	// total de componentes que hay, en este caso que no pase de 3.
	function nextStep() {
		setcurrentStep((index) => {
			if (index >= steps.length - 1) {
				return index;
			}
			return index + 1;
		});
	}
	// Lo mismo que la funcion anterior, solo que no se pase de 0 que es el primer elemento
	function prevStep() {
		setcurrentStep((index) => {
			if (index <= 0) {
				return index;
			}
			return index - 1;
		});
	}

	function resetCounter() {
		setcurrentStep(0);
	}

	return {
		// currentStep para saber en que posicion estamos
		currentStep,
		// steps es el arreglo de componentes
		steps,
		// step que es la posicion actual dentro del arreglo
		step: steps[currentStep],
		// si estamos en el primer paso
		isFirstStep: currentStep === 0,
		//si estamos en ultimo paso
		isLastStep: currentStep === steps.length - 1,
		// las dos funciones ya descritas
		nextStep,
		prevStep,
		resetCounter,
	};
}
