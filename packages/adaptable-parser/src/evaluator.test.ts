// @ts-ignore
import { parse } from './parser';
import { evaluate } from './evaluator';
import { baseFunctions } from './functions';

const context: any = {
  row: {
    A: 'Value A',
    B: 10,
  },
};

const t = (name: string, input: string, output: any) => {
  test(name, () => {
    expect(evaluate(parse(input), baseFunctions, context)).toEqual(output);
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
  t('ARRAY', '[1, "A"]', [[1, 'A']]);
});

describe('function', () => {
  t('FUNCTION', 'COL("B")', [10]);
});

describe('smart', () => {
  //
});
