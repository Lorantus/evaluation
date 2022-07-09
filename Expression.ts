import {Evaluable} from './Evaluable';
import { Evaluation } from './Evaluation';
import { Evaluationable } from './Evaluationable';
import { Evaluator } from './Evaluator';
import { Value } from './Value';

export interface Expression extends Evaluationable, Evaluable {
}