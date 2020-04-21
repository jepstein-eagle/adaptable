import {
  NumberFormatterOptions,
  DateFormatterOptions,
  AdaptableFormat,
} from '../../PredefinedConfig/Common/AdaptableFormat';
import dateFnsFormat from 'date-fns/format';

export function Format(input: any, format: AdaptableFormat) {
  if (format.Formatter === 'NumberFormatter') return NumberFormatter(input, format.Options);
  if (format.Formatter === 'DateFormatter') return DateFormatter(input, format.Options);
  throw new Error('Unknown formatter');
}

export function NumberFormatter(input: number, options: NumberFormatterOptions = {}) {
  let n: number = input;

  if (options.Multiplier !== undefined) {
    n *= options.Multiplier;
  }

  if (options.Parentheses === true && input < 0) {
    n *= -1;
  }

  let s: string = n.toLocaleString('en-US', {
    minimumIntegerDigits: options.IntegerDigits || undefined,
    minimumFractionDigits: options.FractionDigits,
    maximumFractionDigits: options.FractionDigits,
  });

  if (options.FractionSeparator !== undefined) {
    s = s.replace(/\./g, options.FractionSeparator);
  }

  if (options.IntegerSeparator !== undefined) {
    s = s.replace(/\,/g, options.IntegerSeparator);
  }

  s = (options.Prefix || '') + s + (options.Suffix || '');

  if (options.Parentheses === true && input < 0) {
    s = '(' + s + ')';
  }

  return s;
}

export function DateFormatter(input: number | Date, options: DateFormatterOptions) {
  try {
    return dateFnsFormat(input, options.Pattern || '');
  } catch (error) {
    return '???';
  }
}

export default { NumberFormatter, DateFormatter };
