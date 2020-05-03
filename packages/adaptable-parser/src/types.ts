export type AST = AST_Expression[];

export type AST_Expression =
  | AST_Expression[]
  | AST_Function
  | boolean
  | number
  | string;

export type AST_Function = {
  type: string;
  args: AST_Expression[];
  range?: [number, number];
};

export type Token = {
  type: string;
  value: string;
  range: [number, number];
};

export type Context = {
  row: { [key: string]: any };
};

export type FunctionMap = {
  [key: string]: Function;
};

export type Function = {
  docs?: FunctionDocBlock[];
  handler: FunctionHandler;
};

export type FunctionDocBlock =
  | { type: 'code'; content: string }
  | { type: 'paragraph'; content: string };

export type FunctionHandler = (args: any[], context: Context) => any;
