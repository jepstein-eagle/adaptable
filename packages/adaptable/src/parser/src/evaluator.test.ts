// @ts-ignore
import parser from './parser';
import { evaluateNode } from './evaluator';
import { defaultFunctions } from './functions';
import { Context } from './types';

const context: Context = {
  data: {
    A: 'Value A',
    B: 10,
  },
  functions: defaultFunctions,
  variables: {},
  filters: {},
  value: null,
};

const t = (name: string, input: string, output: any) => {
  test(name, () => {
    expect(evaluateNode(parser.parse(input), context)).toEqual(output);
  });
};

// tests

describe('math', () => {
  t('ADD', '1 + 2', [3]);
  t('SUB', '10 - 2', [8]);
  t('MUL', '2 * 3', [6]);
  t('DIV', '10 / 2', [5]);
  t('MOD', '7 % 2', [1]);
  t('POW', '10 ^ 2', [100]);
});

describe('logic', () => {
  t('OR', '0 OR 1', [true]);
  t('AND', '0 AND 1', [false]);
  t('NOT', '!1', [false]);
  t('IF', '1 ? "yes" : "no"', ['yes']);
});

describe('compare', () => {
  t('EQ', '1 = 2', [false]);
  t('NEQ', '1 != 2', [true]);
  t('LT', '2 < 2', [false]);
  t('LTE', '2 <= 2', [true]);
  t('GT', '2 > 2', [false]);
  t('GTE', '2 >= 2', [true]);
});

describe('literal', () => {
  t('TRUE', 'TRUE', [true]);
  t('FALSE', 'FALSE', [false]);
  t('NUMBER', '1', [1]);
  t('STRING', '"A"', ['A']);
  // t('ARRAY', '[1, "A"]', [[1, 'A']]);
});

describe('function', () => {
  t('FUNCTION', 'COL("B")', [10]);
});

describe('variables', () => {
  t('VAR', 'VAR("X", 5)\nVAR("X") * 2', [undefined, 10]);
});

describe('IN operator', () => {
  t('IN', '2 IN (1, 2, 3)', [true]);
  t('IN', '4 IN (1, 2, 3)', [false]);
});
