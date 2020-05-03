import { FunctionMap } from './types';

export const baseFunctions: FunctionMap = {
  ADD: {
    handler(args) {
      return args.reduce((a: any, b: any) => a + b);
    },
    docs: [
      { type: 'code', content: 'add(...number): number' },
      { type: 'paragraph', content: 'Documentation for add() function' },
    ],
  },
  SUB: {
    handler(args) {
      return args.reduce((a: any, b: any) => a - b);
    },
  },
  MUL: {
    handler(args) {
      return args.reduce((a: any, b: any) => a * b);
    },
  },
  DIV: {
    handler(args) {
      return args.reduce((a: any, b: any) => a / b);
    },
  },
  MOD: {
    handler(args) {
      return args[0] % args[1];
    },
  },
  POW: {
    handler(args) {
      return Math.pow(args[0], args[1]);
    },
  },
  //
  OR: {
    handler(args) {
      return Boolean(args[0] || args[1]);
    },
  },
  AND: {
    handler(args) {
      return Boolean(args[0] && args[1]);
    },
  },
  NOT: {
    handler(args) {
      return Boolean(!args[0]);
    },
  },
  IF: {
    handler(args) {
      return args[0] ? args[1] : args[2];
    },
  },
  //
  EQ: {
    handler(args) {
      return args[0] == args[1];
    },
  },
  NEQ: {
    handler(args) {
      return args[0] != args[1];
    },
  },
  LT: {
    handler(args) {
      return args[0] < args[1];
    },
  },
  LTE: {
    handler(args) {
      return args[0] <= args[1];
    },
  },
  GT: {
    handler(args) {
      return args[0] > args[1];
    },
  },
  GTE: {
    handler(args) {
      return args[0] >= args[1];
    },
  },
  COL: {
    handler(args, context) {
      const name = args[0];
      if (context.row[name] !== undefined) return context.row[name];
      throw new Error(`Column name "${name}" is not found`);
    },
  },
};
