// Let x = 45
// [ LetToken, IdentifierTk, EqualsToken, NumberToken ]

// All the types of token
// QUESTION Why do I need to have a Token type? Is this the Data Type already?
export enum TokenType {
    // Literal Types
    Null,
    Number,
    Identifier,

    // Keywords
    Let,

    // Grouping * Operators
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    EOF, // Signified the end of the file
}

// QUESTION What is Record?
// ANSWER it's basically a dictionary
const KEYWORDS: Record<string, TokenType> = {
    "let": TokenType.Let,
    null: TokenType.Null,
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

function isskippable (str: string) {
    return str == ' ' || str == '/n' || str == '/t'
}

function isint (str: string) {
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
        } else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/' || src[0] == '%') {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == '=') {
            tokens.push(token(src.shift(), TokenType.Equals));
        } else {
            // Handle multicharacter tokens

            // Number token
            // if src[0] is an int then that means everything should be an int since only an int can start with a number
            // isint
            if (isint(src[0])) {
                let num = "";
                // QUESTION how does this loop work because I'm confused as to when is stops?
                // is it because of the isint(src[0])?
                // src.shift removes the first element and returns it
                // it stops when it has emptied src, MIND BLOWN moment

                // QUESTION will there be a case where the input is 1111a?
                while (src.length > 0 && isint(src[0])) {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number));
            } else if (isalpha(src[0])) {
                let ident = "";

                // Problem with this is that it can also accept RESERVED KEYWORDS like 'let', it should only accept USER-DEFINED identifiers
                // SOLUTION create a dictionary to check if it is a reserved keyword
                // QUESTION there are USER-DEFINED identifiers that contain numbers like 'foo1', will the isalpha still work?
                // ANSWER no. isalpha will only make identifiers with letters as 'true'
                while (src.length > 0 && (isalpha(src[0]) || isint(src[0]))) {
                    ident += src.shift();
                }

                // check for reserved keywords
                // NOTE let is mutable while const is immutable
                const reserved = KEYWORDS[ident];
                // QUESTION I dont get why is it number?
                if (typeof reserved == "number") {
                    tokens.push(token(ident, reserved));
                } else {
                    tokens.push(token(ident, TokenType.Identifier));
                }
            } else if (isskippable(src[0])) {
                // QUESTION what will happen to the skipped character? Will they still be included in the next steps or what?
                src.shift(); // SKIP THE CURRENT CHARACTER
            } else {
                console.log("Unrecognized character found in source: ", src[0])
                // Gonna cancel the excecution and exit right away
                Deno.exit(1);
            }
        }
    }

    tokens.push({type: TokenType.EOF, value: "EndOffile"});
    // tokens.push(token("EndOfFile", TokenType.EOF));
    return tokens;

}

// NEW WORD await -
// NEW WORD Deno.readTextFile - just reads or accesses the file
const source = await Deno.readTextFile("./test.txt");

// What this does is get the token from the source file that had been tokenized
// 'tokenn' is just a variable name
for (const tokenn of tokenize(source)) {
    console.log(tokenn);
}