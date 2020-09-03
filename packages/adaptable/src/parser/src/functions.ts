import { FunctionMap } from './types';
import { CellValueType } from '../../PredefinedConfig/Common/Enums';

export const defaultFunctions: FunctionMap = {
  ADD: {
    handler(args) {
      return args.reduce((a: any, b: any) => a + b);
    },
    hidden: true,
    docs: [{ type: 'code', content: 'number + number' }],
  },
  SUB: {
    handler(args) {
      return args.reduce((a: any, b: any) => a - b);
    },
    hidden: true,
    docs: [{ type: 'code', content: 'number - number' }],
  },
  MUL: {
    handler(args) {
      return args.reduce((a: any, b: any) => a * b);
    },
    hidden: true,
    docs: [{ type: 'code', content: 'number x number' }],
  },
  DIV: {
    handler(args) {
      return args.reduce((a: any, b: any) => a / b);
    },
    hidden: true,
    docs: [{ type: 'code', content: 'number / number' }],
  },
  MOD: {
    handler(args) {
      return args[0] % args[1];
    },
    hidden: true,
    docs: [{ type: 'code', content: 'number % number' }],
  },
  POW: {
    handler(args) {
      return Math.pow(args[0], args[1]);
    },
    hidden: true,
    docs: [{ type: 'code', content: 'number ^ number' }],
  },
  //
  OR: {
    handler(args) {
      return Boolean(args[0] || args[1]);
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: 'expression OR expression' }],
  },
  AND: {
    handler(args) {
      return Boolean(args[0] && args[1]);
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: 'expression AND expression' }],
  },
  NOT: {
    handler(args) {
      return Boolean(!args[0]);
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: '!expression' }],
  },
  IF: {
    handler(args) {
      return args[0] ? args[1] : args[2];
    },
    hidden: true,
    docs: [{ type: 'code', content: 'condition ? expression : expression' }],
  },
  //
  EQ: {
    handler(args) {
      return args[0] == args[1];
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: 'number = number' }],
  },
  NEQ: {
    handler(args) {
      return args[0] != args[1];
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: 'number != number' }],
  },
  LT: {
    handler(args) {
      return args[0] < args[1];
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: 'number < number' }],
  },
  LTE: {
    handler(args) {
      return args[0] <= args[1];
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: 'number <= number' }],
  },
  GT: {
    handler(args) {
      return args[0] > args[1];
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: 'number > number' }],
  },
  GTE: {
    handler(args) {
      return args[0] >= args[1];
    },
    hidden: true,
    type: 'boolean',
    docs: [{ type: 'code', content: 'number >= number' }],
  },
  //
  COL: {
    handler(args, context) {
      const columnId = args[0];

      // TODO skip this in eval mode, keep in edit mode
      if (!context.api.columnApi.getColumnFromId(columnId)) {
        throw new Error(`Column name "${columnId}" is not found`);
      }

      return context.api.gridApi.getRawValueFromRowNode(context.node, columnId);
    },
    docs: [{ type: 'code', content: '[columnId]' }],
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
    docs: [{ type: 'code', content: '[column] IN (1, 2, 3)' }],
  },
};
