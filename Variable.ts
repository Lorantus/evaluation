import { Evaluable } from "./Evaluable";
import { Evaluation } from "./Evaluation";
import { Evaluationable } from "./Evaluationable";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { Value } from "./Value";

export class Variable implements Expression {
    constructor(private readonly name: string) {}

    evaluate(evaluator: Evaluator): Evaluation {
        const value = evaluator.getUserVariable(this.name);
        return new Evaluation()
            .appendVariable(this.name, value);
    }

    evaluateValue(evaluator: Evaluator): Value {
        return this.evaluate(evaluator).evaluateValue(evaluator);
    }
}