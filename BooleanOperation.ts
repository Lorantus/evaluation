import { booleanValueVoter } from "./BooleanValueVoter";
import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
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

export function createBooleanValue(value: boolean) {
    return createValue(value ? 1 : 0);
}

export class BooleanOperation implements Expression {
    constructor(
        private readonly left: Evaluationable, 
        private readonly operation: OperationBoolean,
        private readonly right: Evaluationable) {}

    evaluate(evaluator: Evaluator): Evaluation {
        const value = this.evaluateValue(evaluator);
        return new Evaluation()
            .appendValue(value);
    }

    evaluateValue(evaluator: Evaluator): Value {
        const left = evaluator.evaluateValue(this.left);
        const right = evaluator.evaluateValue(this.right);

        if(!(left.isValue() && right.isValue())) {
            return booleanValueVoter(left, right);
        }
    
        const result = operationRepository[this.operation](left.getValue(), right.getValue());
        return createBooleanValue(result);
    }
}