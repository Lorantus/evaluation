import { Evaluation } from "./Evaluation";
import { Evaluator } from "./Evaluator";

export interface Evaluationable {
    evaluate(evaluator: Evaluator): Evaluation;
}