import { Value, ValueType } from "./Value";

const typesOrder: ValueType[] = ["NOT_APPLICABLE", "NOT_COMPUTABLE", "NOT_ENTERED", "NOT_AVIAIBLE"];

export function booleanValueVoter(left: Value<any>, right: Value<any>) {
    const leftIndex = typesOrder.findIndex(typeOrder => typeOrder === left.getType());
    const rightIndex = typesOrder.findIndex(typeOrder => typeOrder === right.getType());
    if(leftIndex < 0) {
        return right;
    }
    if(rightIndex < 0) {
        return left;
    }
    return leftIndex <= rightIndex ? left : right;
}