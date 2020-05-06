import fs from 'fs';
import path from 'path';
// @ts-ignore
import { Parser } from 'jison';
import { AST } from './types';

let parser: Parser;

beforeAll(() => {
  const file = path.join(__dirname, './grammar.jison');
  const grammar = fs.readFileSync(file, 'utf8');
  parser = new Parser(grammar);
});

const t = (name: string, input: string | string[], output: AST) => {
  test(name, () => {
    const inputs = Array.isArray(input) ? input : [input];
    inputs.forEach(input => {
      expect(parser.parse(input)).toMatchObject(output);
    });
  });
};

// tests

describe('math', () => {
  t('ADD', '1 + 2', [{ type: 'ADD', args: [1, 2] }]);
  t('SUB', '1 - 2', [{ type: 'SUB', args: [1, 2] }]);
  t('MUL', '1 * 2', [{ type: 'MUL', args: [1, 2] }]);
  t('DIV', '1 / 2', [{ type: 'DIV', args: [1, 2] }]);
  t('MOD', '1 % 2', [{ type: 'MOD', args: [1, 2] }]);
  t('POW', '1 ^ 2', [{ type: 'POW', args: [1, 2] }]);
});

describe('logic', () => {
  t('OR', ['1 | 2', '1 OR 2'], [{ type: 'OR', args: [1, 2] }]);
  t('AND', ['1 & 2', '1 AND 2'], [{ type: 'AND', args: [1, 2] }]);
  t('NOT', ['! 1', 'NOT 1'], [{ type: 'NOT', args: [1] }]);
  t('IF', '1 ? 2 : 3', [{ type: 'IF', args: [1, 2, 3] }]);
  t('IF', '1 ? 2 : 3 ? 4 : 5', [
    { type: 'IF', args: [1, 2, { type: 'IF', args: [3, 4, 5] }] },
  ]);
});

describe('compare', () => {
  t('EQ', '1 = 2', [{ type: 'EQ', args: [1, 2] }]);
  t('NEQ', '1 != 2', [{ type: 'NEQ', args: [1, 2] }]);
  t('LT', '1 < 2', [{ type: 'LT', args: [1, 2] }]);
  t('LTE', '1 <= 2', [{ type: 'LTE', args: [1, 2] }]);
  t('GT', '1 > 2', [{ type: 'GT', args: [1, 2] }]);
  t('GTE', '1 >= 2', [{ type: 'GTE', args: [1, 2] }]);
});

describe('literal', () => {
  t('TRUE', 'TRUE', [true]);
  t('FALSE', 'FALSE', [false]);
  t('NUMBER', '1', [1]);
  t('STRING', ['"A"', "'A'"], ['A']);
  t('ARRAY', '[1, "A"]', [[1, 'A']]);
  t('EMPTY ARRAY', '[]', [[]]);
});

describe('function', () => {
  t(
    'FUNCTION',
    ['COL(1, "A")', 'col(1, "A")'],
    [{ type: 'COL', args: [1, 'A'] }]
  );
  t('FUNCTION NO ARGS', ['COL()', 'col()'], [{ type: 'COL', args: [] }]);
});

describe('smart', () => {
  t('negative numbers', '1 - -2', [
    {
      type: 'SUB',
      args: [1, -2],
    },
  ]);
  t('grouping', '(1 + 2) * 3', [
    {
      type: 'MUL',
      args: [{ type: 'ADD', args: [1, 2] }, 3],
    },
  ]);
  t('multiple statements', 'VAR("A", 1)\nVAR("A")', [
    { type: 'VAR', args: ['A', 1] },
    { type: 'VAR', args: ['A'] },
  ]);
  t('complex expression', 'COL("A") > 1000 ? "BIG" : DAY(COL("B"))', [
    {
      type: 'IF',
      args: [
        { type: 'GT', args: [{ type: 'COL', args: ['A'] }, 1000] },
        'BIG',
        { type: 'DAY', args: [{ type: 'COL', args: ['B'] }] },
      ],
    },
  ]);
  t('column values', 'IN(COL("A"), ["X", "Y", "Z"])', [
    {
      type: 'IN',
      args: [{ type: 'COL', args: ['A'] }, ['X', 'Y', 'Z']],
    },
  ]);
  t('location tracking', '1 + COL("A")', [
    {
      type: 'ADD',
      args: [1, { type: 'COL', args: ['A'], range: [4, 12] }],
      range: [0, 12],
    },
  ]);
});
