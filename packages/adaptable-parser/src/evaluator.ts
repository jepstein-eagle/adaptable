import { Context } from './types';

export function evaluateNode(node: any, context: Context): any {
  if (
    typeof node === 'boolean' ||
    typeof node === 'number' ||
    typeof node === 'string'
  ) {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((n: any) => evaluateNode(n, context));
  }

  const functionDef = context.functions[node.type];

  if (functionDef) {
    const args = node.args.map((n: any) => evaluateNode(n, context));
    return functionDef.handler(args, context);
  } else {
    throw new Error(`Function not found for type "${node.type}"`);
  }
}
