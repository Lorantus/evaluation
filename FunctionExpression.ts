import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { Value } from "./Value";

export class FunctionExpression implements Expression {
    constructor(
        private readonly name: string,
        private readonly expressions: Expression[]
    ) { }

    evaluate(evaluator: Evaluator<number>): Evaluator<number> {
        const evaluation = evaluator
            .appendFormula(this.name + "(");
        return this.expressions
            .reduce((acc, expression) => acc.appendEvaluationable(expression), evaluator)
            .appendFormula(")");
    }
}