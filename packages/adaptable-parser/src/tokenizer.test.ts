// @ts-ignore
import parser from './parser';
import { tokenize } from './tokenizer';

const t = (name: string, input: string, output: any) => {
  test(name, () => {
    expect(tokenize(parser, input)).toEqual(output);
  });
};

describe('tokenize', () => {
  t('NUMBER', '1', [{ type: 'NUMBER', value: '1', range: [0, 1] }]);
  t('NUMBER', '10 * CO', [
    { type: 'NUMBER', value: '10', range: [0, 2] },
    { type: '*', value: '*', range: [3, 4] },
    { type: 'FUNCTION', value: 'CO', range: [5, 7] },
  ]);
});
