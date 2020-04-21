export type AdaptableFormat =
  | { Formatter: 'NumberFormatter'; Options: NumberFormatterOptions }
  | { Formatter: 'DateFormatter'; Options: DateFormatterOptions };

export type NumberFormatterOptions = {
  FractionDigits?: number;
  FractionSeparator?: string;
  IntegerDigits?: number;
  IntegerSeparator?: string;
  Prefix?: string;
  Suffix?: string;
  Multiplier?: number;
  Parentheses?: boolean;
};

export type DateFormatterOptions = {
  Pattern?: string;
};
