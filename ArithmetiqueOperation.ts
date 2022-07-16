import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";

export type OperationArithmetique = "+" | "-" | "*" | "/" | "%";

export class ArithmetiqueOperation implements Expression {
    constructor(
        private readonly left: Expression,
        private readonly operation: OperationArithmetique,
        private readonly right: Expression) { }

    evaluate(evaluator: Evaluator<number>): Evaluator<number> {
        return evaluator
            .appendEvaluationable(this.left)
            .appendFormula(this.operation)
            .appendEvaluationable(this.right);
    }
}
