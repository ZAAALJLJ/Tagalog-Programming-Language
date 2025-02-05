// QUESTION what does this even do? 
// NodeType is simply a collection types of nodes
// it is used to categorize each data to provide a proper logical structure
// NodeType is a type alias that categorizes the types of nodes. It helps to 
// classify nodes into different types, providing a clear and structured way 
// to identify and work with those nodes in your code.
// Basically a collection of types for nodes

// QUESTION what is type?
// ANSWER its a custom data type

// QUESTION why use | instead of ,
// ANSWER when a variable can be one of multiple specific types we use 'Union'
// , in this case would result in an error since it is not used in a 'type' operator
// , are used to separate elements in objects or arrays 

export type NodeType = 
| "Program" 
| "NumericLiteral" 
| "NullLiteral" 
| "Identifier" 
| "BinaryExpr";

// QUESTION  why is interface Stmt needed? Can't I just do an interface program?
// What is polymorphism and polymorphism in interfaces
export interface Stmt {
    kind: NodeType;
}

// A program is basically full of statments so we can say a Program has a body of an array of statments
// QUESTION however what is a body?
// the 'body' name is just a naming convention and it can be named to anything
export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}

// An expression returns a value while a Stmt does not
// QUESTION why use another interface when I'm already gonna make individual interfaces for each expression
// ANSWER to create a base interface for those that produces a value
export interface Expr extends Stmt {}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    // QUESTION why is left and right an Expr
    // ANSWER because they can either be 1, x, or even a BinaryExpr
    // By using Expr as the type for left and right, you allow any kind of expression to appear as an operand.
    left: Expr;
    right: Expr;
    operator: string;
}

export interface Identifier extends Expr {
    kind: "Identifier";
    symbol: string;
}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}

export interface NullLiteral extends Expr {
    kind: "NullLiteral";
    value: null;
}
