import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { Value } from "./Value";

export class SousExpression implements Expression {
    constructor(private readonly expression: Expression) { }

    evaluate(evaluator): Evaluation<number> {
        return new Evaluation()
            .appendToFormula("(")
            .appendEvaluation(this.expression.evaluate(evaluator))
            .appendToFormula(")");
    }

    evaluateValue(evaluator: Evaluator<number>): Value<number> {
        return evaluator.evaluateValue(this);
    }
}