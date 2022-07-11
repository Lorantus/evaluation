import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { Value } from "./Value";

export class FunctionExpression implements Expression {
    constructor(
        private readonly name: string,
        private readonly expressions: Expression[]
    ) { }

    evaluate(evaluator: Evaluator<number>): Evaluation<number> {
        const evaluation = new Evaluation()
            .appendToFormula(this.name + "(");
        return this.expressions
            .reduce((evaluation, expression) => evaluation.appendEvaluation(expression.evaluate(evaluator)), evaluation)
            .appendToFormula(")");
    }

    evaluateValue(evaluator: Evaluator<number>): Value<number> {
        return evaluator.evaluateValue(this);
    }
}