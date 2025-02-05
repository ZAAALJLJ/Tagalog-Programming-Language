import { NumberVal, NullValue, RuntimeVal, ValueType } from "./values.ts"
import { NodeType, NumericLiteral, Stmt } from "../frontend/ast.ts"


export function evaluate (astNode: Stmt): RuntimeVal {

    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                // NOTE we dont know what the type of the node
                // so we declare it as the right node type
                value: ((astNode as NumericLiteral).value),
                type: "number",
            } as NumberVal;

        default:
            return {
                value: "null",
                type: "null",
            } as NullValue;

    }

}