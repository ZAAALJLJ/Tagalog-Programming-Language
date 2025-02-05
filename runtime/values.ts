// very similar to nodetypes
export type ValueType = "null" | "number";

// QUESTION What is this for?
// ANSWER Base interface for the value during run time
export interface RuntimeVal {
    type: ValueType;
}

export interface NullValue extends RuntimeVal {
    type: "null"
    value: "null"
}

export interface NumberVal extends RuntimeVal {
    type: "number"
    value: number
}