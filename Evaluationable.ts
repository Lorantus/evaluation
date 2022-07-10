import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";

export interface Evaluationable<T> {
    evaluate(evaluator: Evaluator<any>): Evaluation<T>;
}