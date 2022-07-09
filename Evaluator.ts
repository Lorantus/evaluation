import { Evaluation } from "./Evaluation";
import { createValue, Value, valueNotComputable } from "./Value";
import { Variable } from "./Variable";
import { VariableType } from "./VariableType";

function applyEvaluation(formula: string) {
    console.log(formula);
    return eval(formula);
}

export class Evaluator {
    constructor(private readonly userVariables: VariableType) { }

    public getUserVariable(variableName: string): Value {
        return this.userVariables["c_" + variableName];
    }

    public evaluateValue(evaluation: Evaluation): Value {
        const variables = {
            ...evaluation.getVariables(),
        };
        let formula;
        if (Object.keys(variables).length) {
            const hasAtLeastOneValue = Object.keys(variables)
                .find(key => variables[key].isValue());
            if (!hasAtLeastOneValue) {
                return valueNotComputable;
            }

            formula = Object.keys(variables).reduce(
                (formula, key) =>
                    formula.replace(
                        new RegExp(key, "g"),
                        variables[key].getValue().toString()
                    ),
                evaluation.getFormula()
            );
        } else {
            formula = evaluation.getFormula();
        }

        return createValue(applyEvaluation(formula));
    }
}
