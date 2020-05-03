import { Context, FunctionMap } from './types';

export function evaluate(
  node: any,
  functions: FunctionMap,
  context: Context
): any {
  if (
    typeof node === 'boolean' ||
    typeof node === 'number' ||
    typeof node === 'string'
  ) {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((n: any) => evaluate(n, functions, context));
  }

  const functionDef = functions[node.type];

  if (functionDef) {
    const args = node.args.map((n: any) => evaluate(n, functions, context));
    return functionDef.handler(args, context);
  } else {
    throw new Error(`Function not found for type "${node.type}"`);
  }
}
