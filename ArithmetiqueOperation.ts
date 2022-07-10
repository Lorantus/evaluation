import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { Value } from "./Value";

export type OperationArithmetique = "+" | "-" | "*" | "/" | "%";

export class ArithmetiqueOperation implements Expression {
    constructor(
        private readonly left: Expression,
        private readonly operation: OperationArithmetique,
        private readonly right: Expression) { }

    evaluate(evaluator: Evaluator<number>): Evaluation<number> {
        return new Evaluation()
            .appendEvaluation(this.left.evaluate(evaluator))
            .appendToFormula(this.operation)
            .appendEvaluation(this.right.evaluate(evaluator));
    }

    evaluateValue(evaluator: Evaluator<number>): Value<number> {
        return evaluator.evaluateValue(this);
    }
}
