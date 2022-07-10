import { Evaluator } from "./Evaluator";
import { Value } from "./Value";

export interface Evaluable<T> {
    evaluateValue(evaluator: Evaluator<any>): Value<T>
}