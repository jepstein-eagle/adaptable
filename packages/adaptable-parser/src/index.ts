import fs from 'fs';
import path from 'path';
// @ts-ignore
import { Parser } from 'jison';

const file = path.join(__dirname, './grammar.jison');
const grammar = fs.readFileSync(file, 'utf8');
export const parser = new Parser(grammar);

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
  start?: [number, number];
  end?: [number, number];
};
