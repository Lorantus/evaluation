import { ArithmetiqueOperation } from "./ArithmetiqueOperation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { IfExpression } from "./IfExpression";
import { Nombre } from "./Nombre";
import { BooleanOperation } from "./BooleanOperation";
import { createValue, ValueNotApplicable } from "./Value";
import { Variable } from "./Variable";
import { VariableType } from "./VariableType";
import { BooleanFunction } from "./BooleanFunction";

function calculer(expression: Expression) {
    console.log("---------------------------------")
    const userVariables: VariableType = {
        "c_a": createValue(1),
        "c_b": createValue(2),
        "c_c": ValueNotApplicable,
        "c_d": createValue(4)
    };

    const evaluator = new Evaluator(userVariables);

    const evaluation = expression.evaluate(evaluator);

    console.log(evaluation.getFormula());
    console.log(evaluation.getVariables());
    console.log("=" + evaluator.evaluateValue(evaluation).toString());
}

calculer(
    new ArithmetiqueOperation(
        new Nombre("2"),
        "*",
        new BooleanFunction("AND", [
            new BooleanOperation(
                new Nombre("1"),
                "=",
                new Nombre("1")
            ),
            new BooleanOperation(
                new Variable("a"),
                "=",
                new Nombre("2")
            )
        ])
    )
);

calculer(
    new IfExpression(
        new BooleanOperation(
            new ArithmetiqueOperation(
                new Nombre("2"),
                "+",
                new Nombre("1")),
            "=",
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
            new Nombre("40")
        )
    )
);

calculer(
    new IfExpression(
        new BooleanOperation(
            new ArithmetiqueOperation(
                new Nombre("2"),
                "+",
                new Nombre("1")),
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
            new Nombre("40")
        )
    )
);

calculer(
    new ArithmetiqueOperation(
        new Nombre("2"),
        "*",
        new BooleanOperation(
            new Nombre("2"),
            "=",
            new Nombre("1")
        )
    )
);
