import { Evaluator } from "./Evaluator";
import { Value } from "./Value";

export interface Evaluable {
    evaluateValue(evaluator: Evaluator): Value
}