// @ts-ignore
import parser from './parser';
import { evaluateNode } from './evaluator';
import { defaultFunctions } from './functions';
import { findPathTo } from './utils';
import { Context } from './types';

export function parse(input: string) {
  const ast = parser.parse(input);

  const evaluate = (context: Partial<Context>) => {
    const contextWithDefaults: Context = {
      data: { ...context.data },
      variables: { ...context.variables },
      functions: { ...defaultFunctions, ...context.functions },
    };
    const result = evaluateNode(ast, contextWithDefaults);
    return result[result.length - 1];
  };

  return { ast, evaluate };
}

export function evaluate(input: string, context: Partial<Context>) {
  return parse(input).evaluate(context);
}

export { findPathTo, defaultFunctions };
