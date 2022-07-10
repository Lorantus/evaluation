import { BooleanExpression } from "./BooleanExpression";
import { Evaluator } from "./Evaluator";
import { createValue, Value } from "./Value";

type ConstanteType = {
    [k in 'true' | 'false']: Value<boolean>
}

const constantesRepository: ConstanteType = {
    'true': createValue(true),
    'false': createValue(false)
}

export class ConstanteBooleenne implements BooleanExpression {
    constructor(private readonly value: keyof ConstanteType) {}

    evaluateValue(evaluator: Evaluator<boolean>): Value<boolean> {
        return constantesRepository[this.value];
    }
}