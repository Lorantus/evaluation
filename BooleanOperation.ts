import { BooleanExpression } from "./BooleanExpression";
import { booleanValueVoter } from "./BooleanValueVoter";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { createValue, Value} from "./Value";

export type OperationBoolean = "=" | "<" | ">" | "<>" | "<=" | ">=";

const operationRepository: {
    [k in OperationBoolean]: (left: number, right: number) => boolean;
} = {
    "=": (left, right) => left === right,
    "<": (left, right) => left < right,
    ">": (left, right) => left > right,
    "<>": (left, right) => left !== right,
    "<=": (left, right) => left <= right,
    ">=": (left, right) => left >= right,
};

export class BooleanOperation implements BooleanExpression {
    constructor(
        private readonly left: Expression, 
        private readonly operation: OperationBoolean,
        private readonly right: Expression) {}

    evaluateValue(evaluator: Evaluator<boolean>): Value<boolean> {
        const left = this.left.evaluate(evaluator.generateEvaluator<number>()).evaluateValue();
        const right = this.right.evaluate(evaluator.generateEvaluator<number>()).evaluateValue();

        if(!(left.isValue() && right.isValue())) {
            return booleanValueVoter(left, right);
        }
    
        const result = operationRepository[this.operation](left.getValue(), right.getValue());
        return createValue(result);
    }
}