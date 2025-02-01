// Why were this imported?
// the ones from ast were imported cuz those are the data types we're gonna use to categorize
// though I don't know how but I'll check it out how it goes
// QUESTION how will this be used?

// NOTE When you import Program into parser.ts, TypeScript already knows that Program extends Stmt, even if you don't explicitly import Stmt.
// NOTE Though it knows, you can't use it for type checking because it is not imported and program doesn't know what it is
// It only inherits its definitions but can't use the base interface if not imported
// NOTE it’s a best practice to explicitly import base types (or base classes) in any file where they are relevant
import { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier } from "./ast.ts";
import { tokenize, Token, TokenType } from "./lexer.ts";

// Why are the ones from lexer imported?
// tokenize was imported because it's the function were gonna neeed to tokenize a file for the parser
// TokenType was imported because it's what were gonna use for the types of Token
// Token will be used as a structure of the 
// I dunno why Token was imported


// QUESTION Why is default and a class?
// importing a 'default' export simplifies the importing process
// WHEN TO USE when the program has singular focus
export default class Parser {

    // QUESTION why is tokens private?
    // ANSWER so that the tokens won't accidentally be modified outside of the class
    // QUESTION but why it even be modified out of the class?
    // ANSWER when you're codebase is large, you might accidentally access your valus inside the parser and remove it
    // QUESTION why does the data type need [] when making a new array?
    // Token[] means an array of Tokens
    private tokens: Token[] = []

    private not_eof (): boolean {
        // Basically returns true if the current TokenType is not an EOF
        return this.tokens[0].type != TokenType.EOF;
    }

    private at () {
        // This is used to get the first token
        // It is made as a function so it can easily be modified
        // This will also be use multiple times in the program so its wise to make it a function
        // 'as Token' was used in case Typescript has any issues with that
        return this.tokens[0] as Token;
    }

    private eat () {
        const prev = this.tokens.shift() as Token;
        return prev;
    }
    // QUESTION why is this public?
    // ANSWER the 'interpreter' will need to access this to get the AST
    public produceAST(sourceCode: string): Program {
        // QUESTION what does 'this' do
        // ANSWER this is how to call a property of a class
        this.tokens = tokenize(sourceCode);
        // QUESTION why is program a const?
        // ANSWER so that the statements inside the body doesn't get removed or changed
        // QUESTION Haven't I already declared this at ast.ts?
        // ANSWER The interface does not create an actual object; it merely defines what an object of this type should look like.
        // interface is basically for type checking
        const program: Program = {
            kind: "Program",
            body: [],
        };

        // Parse until end of file
        while (this.not_eof()) {
            // QUESTION what does this even push if the source code is already tokenized
            program.body.push(this.parse_stmt());
        }

        return program;
    }

    private parse_stmt (): Stmt {
        // skip to parse_expr
        // Theres no stmt other than programm
        return this.parse_expr();
    }

    private parse_expr (): Expr {
        return this.parse_primary_expr();
        // What type do we wanna parase first?

    }

    // Why are we parsing primary expressions in here?
    // QUESTION What is a primary expression?
    private parse_primary_expr (): Expr {

        // Using this looks really ugly and in the future we might actually change how this works
        // const tk = this.tokens[0];

        // '.type' was accessible because the TOken type is imported and '.type' is a behaviour of the interface Token
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
                // However there is an issue here
                // this doesnt advance
            case TokenType.Number:
                return { kind: "NumericLiteral", value: parseFloat(this.eat().value) } as NumericLiteral;
                // However there is an issue here
                // this doesnt advance
            default:
                console.error("Unexpected token found during parsing!", this.at());
                Deno.exit(1);
            // Trick the compiler for TS
        }
    }
}