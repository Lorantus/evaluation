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

function calculer(expression: Expression) {
    console.log("---------------------------------")
    const userVariables: VariableType = {
        "c_a": createValue(1),
        "c_b": createValue(2),
        "c_c": ValueNotApplicable,
        "c_d": createValue(4)
    };

    const evaluator = new Evaluator<number>(userVariables);

    const evaluation = expression.evaluate(evaluator);

    console.log(">" + evaluation.getFormula());
    console.log("]" + JSON.stringify(evaluation.getVariables()));

    console.log("=" + evaluator.evaluateEvaluation(evaluation).toString());
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
                    new Variable("a"),
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
                        new Variable("a"),
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
            new Variable("c"),
            "+",
            new Variable("c")
        ),
        new ArithmetiqueOperation(
            new Variable("d"),
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
                new Variable("a"),
                "+",
                new Variable("b"))
        ),
        new ArithmetiqueOperation(
            new Variable("c"),
            "+",
            new Variable("c")
        ),
        new ArithmetiqueOperation(
            new Variable("d"),
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
            new Variable("c"),
            "+",
            new Variable("c")
        ),
        new ArithmetiqueOperation(
            new Variable("d"),
            "+",
            new ConstanteMathematique("50")
        )
    )
);
