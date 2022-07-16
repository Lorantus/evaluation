import { BooleanExpression } from "./BooleanExpression";
import { BooleanOperation } from "./BooleanOperation";
import { booleanValueVoter } from "./BooleanValueVoter";
import { Evaluator } from "./Evaluator";
import { createValue, Value } from "./Value";

export type BooleanFunctionType = "AND" | "OR" | "NOT";

const fonctionsRepository: {
    [k in BooleanFunctionType]: {
        readonly initialValue: Value<boolean>,
        apply: (left: Value<boolean>, right: Value<boolean>) => boolean
    }
} = {
    "AND": {
        initialValue: createValue<boolean>(true),
        apply: (left, right) => !!(left.getValue() && right.getValue())
    },
    "OR": {
        initialValue: createValue<boolean>(false),
        apply: (left, right) => !!(left.getValue() || right.getValue())
    },
    "NOT": {
        initialValue: createValue<boolean>(true),
        apply: (left, right) => !left.getValue()
    }
}

export class BooleanFunction implements BooleanExpression {
    constructor(
        private readonly name: BooleanFunctionType,
        private readonly tests: BooleanOperation[]) {}

    evaluateValue(evaluator: Evaluator<boolean>): Value<boolean> {
        const fonction = fonctionsRepository[this.name];
        const value = this.tests.reduce((acc, test) => {
            const testValue = test.evaluateValue(evaluator.generateEvaluator<boolean>());
            if(!(testValue.isValue() && acc.isValue())) {
                return booleanValueVoter(testValue, acc);
            } else {
                const result = fonction.apply(acc, testValue);
                return createValue(result);
            }
        }, fonction.initialValue);

        return value;
    }
}