import { BooleanExpression } from "./BooleanExpression";
import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { Evaluator } from "./Evaluator";
import { createValue, Value } from "./Value";

type ConstanteType = {
    [k in 'true' | 'false']: Value
}

const constantesRepository: ConstanteType = {
    'true': createValue(1),
    'false': createValue(0)
}

export class ConstanteBooleenne implements BooleanExpression {
    constructor(private readonly value: keyof ConstanteType) {}

    evaluateValue(evaluator: Evaluator): Value {
        return constantesRepository[this.value];
    }
}