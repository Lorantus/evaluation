import { ArithmetiqueOperation } from "./ArithmetiqueOperation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { IfExpression } from "./IfExpression";
import { ConstanteMathematique } from "./ConstanteMathematique";
import { BooleanOperation } from "./BooleanOperation";
import { createValue, ValueNotApplicable } from "./Value";
import { Variable } from "./Variable";
import { VariableType } from "./VariableType";
import { BooleanFunction } from "./BooleanFunction";
import { ConstanteBooleenne } from "./ConstanteBooleenne";
import { SousExpression } from "./SousExpression";
import { FunctionExpression } from "./FunctionExpression";
import { createValueVariableDeclarationHolder, VariableDeclarationHolder } from "./Holders";
import { ValueSupplier } from "./ValuePlaceholder";

const variableDeclarationHolder = new VariableDeclarationHolder();
variableDeclarationHolder.push(new Variable('i', '123'));
variableDeclarationHolder.push(new Variable('i', '456'));

const valueSupplier: ValueSupplier<number> = new ValueSupplier<number>();
valueSupplier.push('123', createValue(123));
valueSupplier.push('456', createValue(456));

const valueVariableDeclarationHolder = createValueVariableDeclarationHolder(variableDeclarationHolder, valueSupplier);

function calculer(expression: Expression) {
    console.log("---------------------------------")
    const userVariables: VariableType = {
        "123": createValue(1),
        "456": createValue(2),
        "789": ValueNotApplicable,
        "321": createValue(4)
    };

    const evaluator = expression.evaluate(new Evaluator<number>(userVariables));
    console.log("=" + evaluator.evaluateValue().getValue());
}

calculer(
    new ArithmetiqueOperation(
        new ConstanteMathematique("2"),
        "*",
        new IfExpression(
            new BooleanFunction("AND", [
                new BooleanOperation(
                    new ConstanteMathematique("1"),
                    "=",
                    new ConstanteMathematique("1")
                ),
                new BooleanOperation(
                    new Variable('i', '123'),
                    "=",
                    new ConstanteMathematique("2")
                )
            ]),
            new ConstanteMathematique("1"),
            new ConstanteMathematique("0")
        )
    )
);

calculer(
    new IfExpression(
        new BooleanOperation(
            new IfExpression(
                new BooleanFunction("AND", [
                    new BooleanOperation(
                        new ConstanteMathematique("1"),
                        "=",
                        new ConstanteMathematique("1")
                    ),
                    new BooleanOperation(
                        new Variable('i', '123'),
                        "=",
                        new ConstanteMathematique("2")
                    )
                ]),
                new ConstanteMathematique("1"),
                new ConstanteMathematique("0")
            ),
            "=",
            new ConstanteMathematique("1")
        ),
        new ArithmetiqueOperation(
            new Variable('i', '789'),
            "+",
            new Variable('i', '789'),
        ),
        new ArithmetiqueOperation(
            new Variable('i', '321'),
            "+",
            new ConstanteMathematique("40")
        )
    )
);

calculer(
    new IfExpression(
        new BooleanOperation(
            new ArithmetiqueOperation(
                new ConstanteMathematique("2"),
                "+",
                new ConstanteMathematique("1")),
            "<>",
            new ArithmetiqueOperation(
                new Variable('i', '123'),
                "+",
                new Variable('i', '456'))
        ),
        new ArithmetiqueOperation(
            new Variable('i', '789'),
            "+",
            new Variable('i', '789')
        ),
        new ArithmetiqueOperation(
            new Variable('i', '321'),
            "+",
            new ConstanteMathematique("40")
        )
    )
);

calculer(
    new ArithmetiqueOperation(
        new ConstanteMathematique("e"),
        "*",
        new IfExpression(
            new BooleanOperation(
                new ConstanteMathematique("2"),
                "=",
                new ConstanteMathematique("2")
            ),
            new ConstanteMathematique("1"),
            new ConstanteMathematique("0")
        )
    )
);

calculer(
    new IfExpression(
        new ConstanteBooleenne("false"),
        new ArithmetiqueOperation(
            new Variable('i', '789'),
            "+",
            new Variable('i', '789')
        ),
        new ArithmetiqueOperation(
            new Variable('i', '321'),
            "+",
            new ConstanteMathematique("50")
        )
    )
);

calculer(
    new ArithmetiqueOperation(
        new SousExpression(
            new ArithmetiqueOperation(
                new ConstanteMathematique("1"),
                "*",
                new ConstanteMathematique("2")
            )
        ),
        "+",
        new FunctionExpression("Math.cos", [
            new ArithmetiqueOperation(
                new ConstanteMathematique("1"),
                "+",
                new ConstanteMathematique("0.12")
            )
        ])
    )
);