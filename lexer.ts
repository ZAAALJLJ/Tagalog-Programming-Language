// Let x = 45
// [ LetToken, IdentifierTk, EqualsToken, NumberToken ]

// All the types of token
// QUESTION Why do I need to have a Token type? Is this the Data Type already?
export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Let,
}

// 'export' makes the interface Token available for use in other files of modules.
// Without export, the Token interface would only be accessible within the file where it is defined
// With this I can put the Tokens into the 'parser'


// 'interface' is similar to a class but also different
// While a class can define an objects shape and behaviour (methods)
// an interface can only define an object's shape and can't define a behavior (method)
// reason for use, the token won't be needing any methods as its just a container for data

export interface Token {
    value: string;
    type: TokenType;
}

// To make the code cleaner instead of having a long line of code in a single line, so just make a fucntion out of it
function token(value = "", type: TokenType): Token {
    return { value, type };
}

function isalpha (src: string) {
    // ADJFHK23D != adjfhk23d == True
    return src.toUpperCase() != src.toLowerCase();
}

function isint (str: string) {
    // only the first character is checked since if the first character is an int then that means it already is an int
    // only an int has a number as a first character
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

// QUESTION what is the 'function'
// Basically 'def' in Python

// QUESTION what is the difference between a function and a method
// ANSWER a function is independent and not addociated with a particular object
// While a method is often called with teh 'dot' operator as it is associated with an object

// QUESTION why is this function being exported?
export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");

    // Build each token until end of file
    // shift is useful SHORTCUT that moves unto the next data in the array
    while (src.length > 0) {
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/' ) {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == '==') {
            tokens.push(token(src.shift(), TokenType.Equals));
        } else {
            // Handle multicharacter tokens
        }
    }
    return tokens;
}