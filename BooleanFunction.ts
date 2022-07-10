import { BooleanExpression } from "./BooleanExpression";
import { BooleanOperation, createBooleanValue } from "./BooleanOperation";
import { booleanValueVoter } from "./BooleanValueVoter";
import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { createValue, Value } from "./Value";

export type BooleanFunctionType = "AND" | "OR" | "NOT";

const fonctionsRepository: {
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

export class BooleanFunction implements BooleanExpression {
    constructor(
        private readonly name: BooleanFunctionType,
        private readonly tests: BooleanOperation[]) {}

    evaluateValue(evaluator: Evaluator): Value {
        const fonction = fonctionsRepository[this.name];
        const value = this.tests.reduce((acc, test) => {
            const testValue = test.evaluateValue(evaluator);
            if(!(testValue.isValue() && acc.isValue())) {
                return booleanValueVoter(testValue, acc);
            } else {
                const result = fonction.apply(acc, testValue);
                return createBooleanValue(result);
            }
        }, createValue(1));

        return value;
    }
}