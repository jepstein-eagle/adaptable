// @ts-ignore
import { parser } from './parser';
import { evaluate } from './evaluator';
import { baseFunctions } from './functions';
import { findPathTo } from './utils';
import { Context, FunctionMap } from './types';

const parse = parser.parse.bind(parser);

const compile = (input: string, customFunctions: FunctionMap = {}) => {
  const ast = parse(input);
  const functions = { ...baseFunctions, ...customFunctions };
  return (context: Context) => evaluate(ast, functions, context);
};

export { parse, evaluate, compile, findPathTo, baseFunctions };
