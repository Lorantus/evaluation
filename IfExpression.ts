import { Evaluable } from "./Evaluable";
import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { TestOperation } from "./TestOperation";
import { Value } from "./Value";

export class IfExpression implements Expression {
    constructor(
        private readonly test: TestOperation,
        private readonly leftExpression: Expression,
        private readonly rightExpression: Expression) {}

    evaluate(evaluator: Evaluator): Evaluation {
        const test = this.test.evaluateValue(evaluator);
        if(test.getType() === 'VALUE') {
            const evaluation = (test.getValue() ? this.leftExpression : this.rightExpression).evaluate(evaluator);
            const value = evaluator.evaluateValue(evaluation);
    
            return new Evaluation()
                .appendValue(value);
        } else {
            return new Evaluation()
                .appendValue(test);
        }
    }

    evaluateValue(evaluator: Evaluator): Value {
        return this.evaluate(evaluator).evaluateValue(evaluator);
    }
}