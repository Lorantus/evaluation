import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { createValue, Value, valueNotComputable } from "./Value";
import { VariableType } from "./VariableType";

function applyEvaluation(formula: string) {
    console.log(formula);
    return eval(formula);
}

export class Evaluator<T> {
    constructor(private readonly userVariables: VariableType) { }

    static createEvaluator<V>(evaluator: Evaluator<any>) {
        return new Evaluator<V>(evaluator.userVariables);
    }

    public getUserVariable(variableName: string): Value<T> {
        return this.userVariables["c_" + variableName];
    }

    public evaluateValue(evaluationable: Evaluationable<T>): Value<T> {
        const evaluation = evaluationable.evaluate(this);
        return this.evaluateEvaluation(evaluation);
    }

    public evaluateEvaluation(evaluation: Evaluation<T>): Value<T> {
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
