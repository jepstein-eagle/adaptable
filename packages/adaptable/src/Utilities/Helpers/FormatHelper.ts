import {
  NumberFormatOptions,
  DateFormatOptions,
} from '../../PredefinedConfig/Common/AdaptableFormat';
import dateFnsFormat from 'date-fns/format';

export function FormatNumber(input: number, options: NumberFormatOptions = {}) {
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

export function FormatDate(input: number | Date, options: DateFormatOptions) {
  try {
    return dateFnsFormat(input, options.Pattern || '');
  } catch (error) {
    return '???';
  }
}

export default { FormatNumber, FormatDate };
