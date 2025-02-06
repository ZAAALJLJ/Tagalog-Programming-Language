import { NumberVal, NullValue, RuntimeVal } from "./values.ts"
import { BinaryExpr, NumericLiteral, Program, Stmt } from "../frontend/ast.ts"


function eval_program (program: Program): RuntimeVal {
    let lastEvaluated: RuntimeVal = { type: "null", value: "null" } as NullValue;

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement);
    }

    return lastEvaluated;
}

function eval_numeric_binary_expr (lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
    let result: number;
    if (operator == "+")
        result = lhs.value + rhs.value;
    else if (operator == "-")
        result = lhs.value - rhs.value;
    else if (operator == "*")
        result = lhs.value * rhs.value;
    else if (operator == "/")
        result = lhs.value / rhs.value;
    else {
        result = lhs.value % rhs.value;
    }

    return {value: result, type: "number"};
}

function eval_binary_expr (binop: BinaryExpr): RuntimeVal {

    const lhs = evaluate(binop.left);
    const rhs = evaluate(binop.right);

    if (lhs.type == "number" && rhs.type == "number") {
        return eval_numeric_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator);
    }

    // One or both are NULL
    return {
        type: "null",
        value: "null", 
    } as NullValue;
}

export function evaluate (astNode: Stmt): RuntimeVal {

    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                // NOTE we dont know what the type of the node
                // so we declare it as the right node type
                value: ((astNode as NumericLiteral).value),
                type: "number",
            } as NumberVal;

        case "NullLiteral":
            return {
                value: "null",
                type: "null",
            } as NullValue;
        case "BinaryExpr":
            return eval_binary_expr(astNode as BinaryExpr);
        case "Program":
            return eval_program(astNode as Program);
        default:
            console.error("This AST Node has not yet been setup for interpretation.", astNode);
            Deno.exit(0);
            

    }

}