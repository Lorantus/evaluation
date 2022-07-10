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

    evaluate(evaluator: Evaluator<number>): Evaluation<number> {
        if(constantesRepository[this.value]) {
            return new Evaluation()
                .appendToFormula(constantesRepository[this.value])
        }
        return new Evaluation()
            .appendToFormula(this.value);
    }

    evaluateValue(evaluator: Evaluator<number>): Value<number> {
        return evaluator.evaluateValue(this);
    }
}