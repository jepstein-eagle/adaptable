import { FunctionMap } from './types';

export const defaultFunctions: FunctionMap = {
  ADD: {
    handler(args) {
      return args.reduce((a: any, b: any) => a + b);
    },
    hidden: true,
    docs: [
      { type: 'code', content: 'add(...number): number' },
      { type: 'paragraph', content: 'Documentation for add() function' },
    ],
  },
  SUB: {
    handler(args) {
      return args.reduce((a: any, b: any) => a - b);
    },
    hidden: true,
  },
  MUL: {
    handler(args) {
      return args.reduce((a: any, b: any) => a * b);
    },
    hidden: true,
  },
  DIV: {
    handler(args) {
      return args.reduce((a: any, b: any) => a / b);
    },
    hidden: true,
  },
  MOD: {
    handler(args) {
      return args[0] % args[1];
    },
    hidden: true,
  },
  POW: {
    handler(args) {
      return Math.pow(args[0], args[1]);
    },
    hidden: true,
  },
  //
  OR: {
    handler(args) {
      return Boolean(args[0] || args[1]);
    },
    hidden: true,
  },
  AND: {
    handler(args) {
      return Boolean(args[0] && args[1]);
    },
    hidden: true,
  },
  NOT: {
    handler(args) {
      return Boolean(!args[0]);
    },
    hidden: true,
  },
  IF: {
    handler(args) {
      return args[0] ? args[1] : args[2];
    },
    hidden: true,
  },
  //
  EQ: {
    handler(args) {
      return args[0] == args[1];
    },
    hidden: true,
  },
  NEQ: {
    handler(args) {
      return args[0] != args[1];
    },
    hidden: true,
  },
  LT: {
    handler(args) {
      return args[0] < args[1];
    },
    hidden: true,
  },
  LTE: {
    handler(args) {
      return args[0] <= args[1];
    },
    hidden: true,
  },
  GT: {
    handler(args) {
      return args[0] > args[1];
    },
    hidden: true,
  },
  GTE: {
    handler(args) {
      return args[0] >= args[1];
    },
    hidden: true,
  },
  //
  COL: {
    handler(args, context) {
      const name = args[0];
      if (context.data[name] !== undefined) return context.data[name];
      throw new Error(`Column name "${name}" is not found`);
    },
    docs: [{ type: 'code', content: 'col(name: string): any' }],
  },
  MIN: {
    handler(args) {
      return Math.min(...args);
    },
    docs: [{ type: 'code', content: 'min(...number): number' }],
  },
  MAX: {
    handler(args) {
      return Math.max(...args);
    },
    docs: [{ type: 'code', content: 'max(...number): number' }],
  },
  AVG: {
    handler(args) {
      if (args.length === 0) return 0;
      return args.reduce((a, b) => a + b) / args.length;
    },
    docs: [{ type: 'code', content: 'avg(...number): number' }],
  },
  BETWEEN: {
    handler([input, lower, upper]) {
      if (typeof input !== 'number') throw Error('arg 1 should be a number');
      return input >= lower && input <= upper;
    },
    docs: [
      {
        type: 'code',
        content:
          'between(input: number, lower: number, upper: number): boolean',
      },
    ],
  },
};
