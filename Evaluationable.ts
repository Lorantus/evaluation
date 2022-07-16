import { Evaluator } from "./Evaluator";

export interface Evaluationable<T> {
    evaluate(evaluator: Evaluator<any>): Evaluator<any>;
}