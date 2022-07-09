import { Value } from "./Value";
import { VariableType } from "./VariableType";

export class Evaluation {
    constructor(
        private readonly formula: string = "",
        private readonly variables: VariableType = {}
    ) {}

    getFormula() {
        return this.formula;
    }

    getVariables() {
        return this.variables;
    }

    appendEvaluation(evaluation: Evaluation) {
        return new Evaluation(this.formula + evaluation.formula, {...this.variables, ...evaluation.variables});
    }

    appendToFormula(partial: string) {
        return new Evaluation(this.formula + partial, {...this.variables});
    }

    appendVariable(variableName: string, value: Value) {
        const name = "c_" + variableName;
        return new Evaluation(this.formula + name, {...this.variables, [name]: value});
    }

    appendValue(value: Value) {
        const variableName = "v_" + this.createVariableName(3);
        return new Evaluation(this.formula + variableName, {...this.variables, [variableName]: value});
    }

    createVariableName(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
