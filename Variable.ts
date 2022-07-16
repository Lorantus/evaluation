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

    evaluate(evaluator: Evaluator<number>): Evaluator<number> {
        return evaluator
            .appendVariable(this.valueId);
    }
}