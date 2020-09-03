// @ts-ignore
import parser from './parser';
import { evaluateNode } from './evaluator';
import { defaultFunctions } from './functions';
import { findPathTo } from './utils';
import { Context, FunctionMap } from './types';
import Adaptable from '../../agGrid';

export function parse(input: string) {
  const ast = parser.parse(input.trim());

  const evaluate = (context: Context) => {
    const contextWithDefaults: Context = {
      ...context,
      functions: { ...defaultFunctions, ...context.functions },
    };
    const result = evaluateNode(ast, contextWithDefaults);
    return result[result.length - 1];
  };

  return { ast, evaluate };
}

const cache: Record<string, any> = {};
export function evaluate(input: string, context: Context) {
  cache[input] = cache[input] || parse(input);
  return cache[input].evaluate(context);
}

export function validate(input: string) {
  try {
    if (input.trim() === '') return true;
    parser.parse(input.trim());
    return true;
  } catch (error) {
    return false;
  }
}

export function validateBoolean(input: string) {
  try {
    if (input.trim() === '') return true;
    const ast = parser.parse(input.trim());
    const rootFn = ast[ast.length - 1];

    if (
      rootFn.type === undefined ||
      defaultFunctions[rootFn.type] === undefined
    ) {
      return false;
    }

    return defaultFunctions[rootFn.type].type === 'boolean';
  } catch (error) {
    return false;
  }
}

export function getColumnsFromExpression(input: string): string[] {
  const columns: string[] = [];

  // @ts-ignore
  const walk = (node: any) => {
    if (typeof node !== 'object') {
      return false;
    }

    if (Array.isArray(node)) {
      return node.map(walk);
    }

    node.args.map(walk);

    if (node.type === 'COL') {
      columns.push(String(node.args[0]));
    }
  };

  walk(parser.parse(input.trim()));

  return columns;
}

export { findPathTo, defaultFunctions };
