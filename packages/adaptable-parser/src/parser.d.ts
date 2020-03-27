type AST = AST_Expression[];

type AST_Expression =
  | AST_Expression[]
  | AST_Function
  | boolean
  | number
  | string;

type AST_Function = {
  type: string;
  args: AST_Expression[];
  range?: [number, number];
};
