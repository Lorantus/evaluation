import { Evaluable } from "./Evaluable";
import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { createValue, Value, valueNotComputable } from "./Value";
import { VariableType } from "./VariableType";

function applyEvaluation(formula: string) {
    console.log(formula);
    return eval(formula);
}

export class Evaluator<T> {
    public constructor(
        private readonly userVariables: VariableType,
        private evaluation: Evaluation<T> = new Evaluation<T>()) { }

    generateEvaluator<V>() {
        return new Evaluator<V>({...this.userVariables});
    }

    public appendEvaluationable(evaluationable: Evaluationable<any>): Evaluator<any> {
        evaluationable.evaluate(this);
        return this;
    }

    public chainEvaluator(evaluator: Evaluator<any>): Evaluator<any> {
        this.evaluation.appendEvaluation(evaluator.evaluation);
        return this;
    }

    public appendFormula(formula: string): Evaluator<any> {
        this.evaluation.appendFormula(formula);
        return this;
    }

    public appendVariable(valueId: string) {
        this.evaluation.appendVariable("_" + this.createVariableName(3), this.userVariables[valueId]);
        return this;
    }

    public appendValue(value: Value<any>) {
        this.evaluation.appendVariable("v" + this.createVariableName(3), value);
        return this;
    }

    private createVariableName(length) {
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        return [...Array(length).keys()]
            .reduce((acc, _) => {
                return acc + characters.charAt(Math.floor(Math.random() * charactersLength));
            }, '');
    }

    public evaluate(evaluable: Evaluable<T>) {
        return evaluable.evaluateValue(this);
    }

    public evaluateValue(): Value<T> {
        const variables = {
            ...this.evaluation.getVariables(),
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
                    this.evaluation.getFormula()
            );
        } else {
            formula = this.evaluation.getFormula();
        }

        return createValue(applyEvaluation(formula));
    }
}
