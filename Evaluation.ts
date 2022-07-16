import { Value } from "./Value";
import { VariableType } from "./VariableType";

export class Evaluation<T> {
    constructor(
        private formula: string = '',
        private variables: VariableType = {}
    ) {}

    reset() {
        this.formula = '';
    }

    getFormula() {
        return this.formula;
    }

    getVariables() {
        return this.variables;
    }

    appendEvaluation(evaluation: Evaluation<T>) {
        this.formula = this.formula + evaluation.formula;
        this.variables = {
            ...this.variables, 
            ...evaluation.variables
        };
    }

    appendFormula(partial: string) {
        this.formula = this.formula + partial;
    }

    appendVariable(variableName: string, value: Value<T>) {
        this.formula = this.formula + variableName;
        this.variables = {
            ...this.variables,
             [variableName]: value
        };
    }
}
