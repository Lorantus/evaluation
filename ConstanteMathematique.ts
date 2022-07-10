import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { Evaluator } from "./Evaluator";
import { createValue, Value } from "./Value";

const constantesRepository = {
    'pi': createValue(3.141592653),
    'e': createValue(2.718281828)
}

export class ConstanteMathematique implements Evaluationable {
    constructor(private readonly value: string) {}

    evaluate(evaluator: Evaluator): Evaluation {
        if(constantesRepository[this.value]) {
            return new Evaluation()
                .appendToFormula(constantesRepository[this.value])
        }
        return new Evaluation()
            .appendToFormula(this.value);
    }
}