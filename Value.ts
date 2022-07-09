export type ValueType =
    | "NOT_APPLICABLE"
    | "NOT_ENTERED"
    | "NOT_AVIAIBLE"
    | "NOT_COMPUTABLE"
    | "VALUE";

export interface Value {
    getValue(): number;
    getType(): ValueType;
    isValue(): boolean;
}

class ValueImpl implements Value {
    constructor(
        private readonly value: number,
        private readonly type: ValueType
    ) { }

    getValue() {
        return this.isValue() ? this.value : 0;
    }

    isValue() {
        return this.type === 'VALUE';
    }

    getType(): ValueType {
        return this.type;
    }

    equals(other: Value) {
        return other == this ||
            (other &&
                this.type === other.getType() &&
                this.value === other.getValue());
    }

    toString(): string {
        return this.isValue() ? this.value.toString() : this.type.toString();
    }
}

export function createValue(value: number): Value {
    return new ValueImpl(value, 'VALUE');
}

export const ValueNotApplicable: Value = new ValueImpl(null, 'NOT_APPLICABLE');
export const valueNotEntered: Value = new ValueImpl(null, 'NOT_ENTERED');
export const valueNotAviaible: Value = new ValueImpl(null, 'NOT_AVIAIBLE');
export const valueNotComputable: Value = new ValueImpl(null, 'NOT_COMPUTABLE');