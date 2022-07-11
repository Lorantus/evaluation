import { Value } from "./Value"

export type ValuePlaceholderType<T> = {
    [k: string]: Value<T>
}

export interface ValuePlaceholderSupplier<T> {
    getValue(valueId: string): Value<T>;
}

export class ValueSupplier<T> implements ValuePlaceholderSupplier<T> {
    constructor(
        private readonly values: ValuePlaceholderType<T> = {}) {}

    getValue(valueId: string): Value<T> {
        return this.values[valueId];
    }

    push(valueId: string, value: Value<T>) {
        this.values[valueId] = value;
    }
}

