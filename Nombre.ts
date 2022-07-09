import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { Value } from "./Value";

export class Nombre implements Evaluationable {
    constructor(private readonly value) {}

    evaluate(evaluator: Evaluator): Evaluation {
        return new Evaluation()
            .appendToFormula(this.value);
    }

    evaluateValue(evaluator: Evaluator): Value {
        return this.evaluate(evaluator).evaluateValue(evaluator);
    }
}