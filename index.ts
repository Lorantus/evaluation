import { ArithmetiqueOperation } from "./ArithmetiqueOperation";
import { Evaluator } from "./Evaluator";
import { Expression } from "./Expression";
import { IfExpression } from "./IfExpression";
import { Constante } from "./Constante";
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

    console.log(">" + evaluation.getFormula());
    console.log("]" + JSON.stringify(evaluation.getVariables()));

    console.log("=" + evaluator.evaluateEvaluation(evaluation).toString());
}

calculer(
    new ArithmetiqueOperation(
        new Constante("2"),
        "*",
        new BooleanFunction("AND", [
            new BooleanOperation(
                new Constante("1"),
                "=",
                new Constante("1")
            ),
            new BooleanOperation(
                new Variable("a"),
                "=",
                new Constante("2")
            )
        ])
    )
);

calculer(
    new IfExpression(
        new BooleanOperation(
            new ArithmetiqueOperation(
                new Constante("2"),
                "+",
                new Constante("1")),
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
            new Constante("40")
        )
    )
);

calculer(
    new IfExpression(
        new BooleanOperation(
            new ArithmetiqueOperation(
                new Constante("2"),
                "+",
                new Constante("1")),
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
            new Constante("40")
        )
    )
);

calculer(
    new ArithmetiqueOperation(
        new Constante("2"),
        "*",
        new BooleanOperation(
            new Constante("2"),
            "=",
            new Constante("1")
        )
    )
);

calculer(
    new IfExpression(
        new Constante("false"),
        new ArithmetiqueOperation(
            new Variable("c"),
            "+",
            new Variable("c")
        ),
        new ArithmetiqueOperation(
            new Variable("d"),
            "+",
            new Constante("50")
        )
    )
);
