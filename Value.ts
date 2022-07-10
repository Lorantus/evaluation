export type ValueType =
    | "NOT_APPLICABLE"
    | "NOT_ENTERED"
    | "NOT_AVIAIBLE"
    | "NOT_COMPUTABLE"
    | "VALUE";

export class Value<T> {
    constructor(
        private readonly value: T,
        private readonly type: ValueType
    ) { }

    getValue() {
        return this.value;
    }

    isValue() {
        return this.type === 'VALUE';
    }

    getType(): ValueType {
        return this.type;
    }

    equals(other: Value<T>) {
        return other == this ||
            (other &&
                this.type === other.getType() &&
                this.value === other.getValue());
    }

    toString(): string {
        return this.isValue() ? this.value.toString() : this.type.toString();
    }
}

export const ValueNotApplicable = new Value<null>(null, 'NOT_APPLICABLE');
export const valueNotEntered = new Value<null>(null, 'NOT_ENTERED');
export const valueNotAviaible = new Value<null>(null, 'NOT_AVIAIBLE');
export const valueNotComputable = new Value<null>(null, 'NOT_COMPUTABLE');

export function createValue<T>(value: T): Value<T> {
    return new Value<T>(value, 'VALUE');
}