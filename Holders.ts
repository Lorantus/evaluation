import { Value } from "./Value";
import { ValuePlaceholderSupplier, ValueSupplier } from "./ValuePlaceholder";
import { Variable } from "./Variable";

export type VarType = 'i' | 'p';

export interface VariableDeclarationPlaceholderSupplier<T> {
    getValue(valueId: string): Value<T>;
}

export class VariableDeclarationHolder {
    private readonly  vars: {
        [k: string]: Variable
    } = {}

    public push(variableDeclaration: Variable): void {
        this.vars[variableDeclaration.getValueId()] = variableDeclaration;
    }

    public getVars() {
        return this.vars;
    }
}

type ValueVarsType<T> = {
    [k: string]: Value<T>
};

export class ValueVariableDeclarationHolder<T> implements ValuePlaceholderSupplier<T> {
    private readonly valueVars: ValueVarsType<T> = {};

    getValue(valueId: string): Value<T> {
        return this.valueVars[valueId]
    }
}

export function createValueVariableDeclarationHolder<T>(variableDeclarationHolder: VariableDeclarationHolder, valueSupplier: ValuePlaceholderSupplier<T>) {
    const vars = variableDeclarationHolder.getVars();
    return Object.keys(vars)
        .reduce((acc, key: string) => {
            const variableDeclaration = vars[key];
            const value = valueSupplier.getValue(key);
            acc[key] = value;
            return acc;
        }, {} as ValueVarsType<T>);
}