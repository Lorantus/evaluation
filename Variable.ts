import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { Value } from "./Value";
import { VarType } from "./Holders";

export class Variable implements Expression {
    constructor(
        private readonly varType: VarType,
        private readonly valueId: string) {}

    public getVarType() {
        return this.varType;
    }

    public getValueId() {
        return this.valueId;
    }

    evaluate(evaluator: Evaluator<any>): Evaluation<number> {
        const value = evaluator.getUserVariable(this.valueId);
        return new Evaluation()
            .appendVariable(this.valueId, value);
    }

    evaluateValue(evaluator: Evaluator<number>): Value<number> {
        return evaluator.evaluateValue(this);
    }
}