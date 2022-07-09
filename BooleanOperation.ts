import { Evaluable } from "./Evaluable";
import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { createValue, Value, ValueType } from "./Value";

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

const typesOrder: ValueType[] = ["NOT_APPLICABLE", "NOT_COMPUTABLE", "NOT_ENTERED", "NOT_AVIAIBLE"];

export function evaluateBooleanValue(left: Value, right: Value) {
        let leftIndex = typesOrder.findIndex(typeOrder => typeOrder === left.getType());
        let rightIndex = typesOrder.findIndex(typeOrder => typeOrder === right.getType());
        if(leftIndex < 0) {
            return right;
        }
        if(rightIndex < 0) {
            return left;
        }
        return leftIndex <= rightIndex ? left : right;
}

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
        const left = evaluator.evaluateValue(this.left.evaluate(evaluator));
        const right = evaluator.evaluateValue(this.right.evaluate(evaluator));

        if(!(left.isValue() && right.isValue())) {
            return evaluateBooleanValue(left, right);
        }
    
        const result = operationRepository[this.operation](left.getValue(), right.getValue());
        return createBooleanValue(result);
    }
}