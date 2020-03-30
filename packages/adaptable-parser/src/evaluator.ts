const functions: {
  [key: string]: (node: any, context: any) => any;
} = {
  ADD(args) {
    return args.reduce((a: any, b: any) => a + b);
  },
  SUB(args) {
    return args.reduce((a: any, b: any) => a - b);
  },
  MUL(args) {
    return args.reduce((a: any, b: any) => a * b);
  },
  DIV(args) {
    return args.reduce((a: any, b: any) => a / b);
  },
  MOD(args) {
    return args[0] % args[1];
  },
  POW(args) {
    return Math.pow(args[0], args[1]);
  },
  //
  OR(args) {
    return Boolean(args[0] || args[1]);
  },
  AND(args) {
    return Boolean(args[0] && args[1]);
  },
  NOT(args) {
    return Boolean(!args[0]);
  },
  IF(args) {
    return args[0] ? args[1] : args[2];
  },
  //
  EQ(args) {
    return args[0] == args[1];
  },
  NEQ(args) {
    return args[0] != args[1];
  },
  LT(args) {
    return args[0] < args[1];
  },
  LTE(args) {
    return args[0] <= args[1];
  },
  GT(args) {
    return args[0] > args[1];
  },
  GTE(args) {
    return args[0] >= args[1];
  },
  COL(args, context) {
    const name = args[0];
    if (context.row[name] !== undefined) return context.row[name];
    throw new Error(`Column name "${name}" is not found`);
  },
};

export function evalNode(node: any, context: any = {}): any {
  if (
    typeof node === 'boolean' ||
    typeof node === 'number' ||
    typeof node === 'string'
  ) {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((n: any) => evalNode(n, context));
  }

  // isObject
  if (functions[node.type]) {
    const args = node.args.map((n: any) => evalNode(n, context));
    return functions[node.type](args, context);
  } else {
    throw new Error(`Function not found for type "${node.type}"`);
  }
}
