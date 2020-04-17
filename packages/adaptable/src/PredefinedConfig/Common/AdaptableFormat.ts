export type AdaptableFormat =
  | { Type: 'number-v1'; Options: NumberFormatOptions }
  | { Type: 'date-v1'; Options: DateFormatOptions };

export type NumberFormatOptions = {
  FractionDigits?: number;
  FractionSeparator?: string;
  IntegerDigits?: number;
  IntegerSeparator?: string;
  Prefix?: string;
  Suffix?: string;
  Multiplier?: number;
  Parentheses?: boolean;
};

export type DateFormatOptions = {
  Pattern?: string;
};
