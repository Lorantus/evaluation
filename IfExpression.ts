import { BooleanExpression } from "./BooleanExpression";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";

export class IfExpression implements Expression {
    constructor(
        private readonly test: BooleanExpression,
        private readonly leftExpression: Expression,
        private readonly rightExpression: Expression) {}

    evaluate(evaluator: Evaluator<number>): Evaluator<number> {
        const test = this.test.evaluateValue(evaluator);
        if(test.isValue()) {
            const expression = (test.getValue() ? this.leftExpression : this.rightExpression);
            const value = expression.evaluate(evaluator.generateEvaluator<boolean>()).evaluateValue();
            return evaluator
                .appendValue(value);
        } else {
            return evaluator
                .appendValue(test);
        }
    }
}