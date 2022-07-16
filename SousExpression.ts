import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";

export class SousExpression implements Expression {
    constructor(private readonly expression: Expression) { }

    evaluate(evaluator: Evaluator<number>): Evaluator<number> {
        return evaluator
            .appendFormula("(")
            .appendEvaluationable(this.expression)
            .appendFormula(")");
    }
}