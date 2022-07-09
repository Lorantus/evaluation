import { BooleanOperation, createBooleanValue, evaluateBooleanValue } from "./BooleanOperation";
import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { createValue, Value } from "./Value";

export type BooleanFunctionType = "AND" | "OR" | "NOT";

const functionRepository: {
    [k in BooleanFunctionType]: {
        apply: (left: Value, right: Value) => boolean
    }
} = {
    "AND": {
        apply: (left, right) => !!(left.getValue() && right.getValue())
    },
    "OR": {
        apply: (left, right) => !!(left.getValue() || right.getValue())
    },
    "NOT": {
        apply: (left, right) => !left.getValue()
    }
}

export class BooleanFunction implements Expression {
    constructor(
        private readonly name: BooleanFunctionType,
        private readonly tests: BooleanOperation[]) {}

    evaluate(evaluator: Evaluator): Evaluation {
        const appyFunction = functionRepository[this.name];
        const value = this.tests.reduce((acc, test) => {
            const testValue = test.evaluateValue(evaluator);
            if(!(testValue.isValue() && acc.isValue())) {
                return evaluateBooleanValue(testValue, acc);
            } else {
                const result = appyFunction.apply(acc, testValue);
                return createBooleanValue(result);
            }
        }, createValue(1));

        return new Evaluation()
            .appendValue(value);
    }

    evaluateValue(evaluator: Evaluator): Value {
        return this.evaluate(evaluator).evaluateValue(evaluator);
    }
}