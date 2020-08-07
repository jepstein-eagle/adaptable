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
  data: { [key: string]: any };
  variables: { [key: string]: any };
  functions: FunctionMap;
  filters: { [key: string]: string };
  value: any;
};

export type FunctionMap = {
  [key: string]: Function;
};

export type Function = {
  docs?: FunctionDocBlock[];
  handler: FunctionHandler;
  hidden?: boolean;
  type?: 'boolean';
};

export type FunctionDocBlock =
  | { type: 'code'; content: string }
  | { type: 'paragraph'; content: string };

export type FunctionHandler = (args: any[], context: Context) => any;
