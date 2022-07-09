import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";
import { Value } from "./Value";

export interface Evaluationable {
    evaluate(evaluator: Evaluator): Evaluation;
}