import { FunctionMap } from './types';
import { CellValueType } from '../../PredefinedConfig/Common/Enums';

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
    type: 'boolean',
  },
  AND: {
    handler(args) {
      return Boolean(args[0] && args[1]);
    },
    hidden: true,
    type: 'boolean',
  },
  NOT: {
    handler(args) {
      return Boolean(!args[0]);
    },
    hidden: true,
    type: 'boolean',
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
    type: 'boolean',
  },
  NEQ: {
    handler(args) {
      return args[0] != args[1];
    },
    hidden: true,
    type: 'boolean',
  },
  LT: {
    handler(args) {
      return args[0] < args[1];
    },
    hidden: true,
    type: 'boolean',
  },
  LTE: {
    handler(args) {
      return args[0] <= args[1];
    },
    hidden: true,
    type: 'boolean',
  },
  GT: {
    handler(args) {
      return args[0] > args[1];
    },
    hidden: true,
    type: 'boolean',
  },
  GTE: {
    handler(args) {
      return args[0] >= args[1];
    },
    hidden: true,
    type: 'boolean',
  },
  //
  COL: {
    handler(args, context) {
      const name = args[0];

      // TODO skip this in eval mode, keep in edit mode
      if (!context.api.columnApi.getColumnFromId(name)) {
        throw new Error(`Column name "${name}" is not found`);
      }

      return context.api.gridApi.getValueFromRowNode(
        context.node,
        name,
        CellValueType.RawValue
      );
    },
    docs: [{ type: 'code', content: 'col(name: string): any' }],
  },
  // VAR: {
  //   handler(args, context) {
  //     if (args.length === 1) {
  //       return context.variables[args[0]];
  //     }
  //     if (args.length === 2) {
  //       context.variables[args[0]] = args[1];
  //     }
  //   },
  // },
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
    type: 'boolean',
    docs: [
      {
        type: 'code',
        content:
          'between(input: number, lower: number, upper: number): boolean',
      },
    ],
  },
  IN: {
    handler([needle, haystack]) {
      return haystack.includes(needle);
    },
    type: 'boolean',
  },
};
