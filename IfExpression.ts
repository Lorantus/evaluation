import { BooleanExpression } from "./BooleanExpression";
import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { Value } from "./Value";

export class IfExpression implements Expression {
    constructor(
        private readonly test: BooleanExpression,
        private readonly leftExpression: Expression,
        private readonly rightExpression: Expression) {}

    evaluate(evaluator: Evaluator<number>): Evaluation<number> {
        const test = this.test.evaluateValue(Evaluator.createEvaluator<boolean>(evaluator));
        if(test.isValue()) {
            const expression = (test.getValue() ? this.leftExpression : this.rightExpression);
            const value = evaluator.evaluateValue(expression);
    
            return new Evaluation()
                .appendValue(value);
        } else {
            return new Evaluation()
                .appendValue(test);
        }
    }

    evaluateValue(evaluator: Evaluator<number>): Value<number> {
        return evaluator.evaluateValue(this);
    }
}