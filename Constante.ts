import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { Evaluator } from "./Evaluator";
import { createValue, Value } from "./Value";

const constantesRepository = {
    'true': createValue(1),
    'false': createValue(0)
}

export class Constante implements Evaluationable {
    constructor(private readonly value) {}

    evaluate(evaluator: Evaluator): Evaluation {
        if(constantesRepository[this.value]) {
            return new Evaluation()
                .appendToFormula(constantesRepository[this.value])
        }
        return new Evaluation()
            .appendToFormula(this.value);
    }

    evaluateValue(evaluator: Evaluator): Value {
        return evaluator.evaluateValue(this);
    }
}