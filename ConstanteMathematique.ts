import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { createValue, Value } from "./Value";

const constantesRepository = {
    'pi': createValue(3.141592653),
    'e': createValue(2.718281828)
}

export class ConstanteMathematique implements Expression {
    constructor(private readonly value: string) {}

    evaluate(evaluator: Evaluator<number>): Evaluator<number> {
        if(constantesRepository[this.value]) {
            return evaluator
                .appendFormula(constantesRepository[this.value]);
        }
        return evaluator
            .appendFormula(this.value);
    }
}