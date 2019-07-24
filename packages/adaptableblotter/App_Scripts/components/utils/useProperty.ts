import { useState } from 'react';

const toUpperFirst = (str: string): string => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

const isControlled = (value: any): boolean => value !== undefined;

const emptyFn = (): void => {};

const useProperty = <TS>(
  props: any,
  propName: string,
  defaultValue?: any | undefined,
  config?: { onChange: (value: TS, ...args: any[]) => void }
): [TS, (...args: any[]) => any] => {
  const PropName = toUpperFirst(propName);

  const defaultValueFromProps = props[`default${PropName}`];

  defaultValue = defaultValueFromProps === undefined ? defaultValue : defaultValueFromProps;

  const [stateValue, setStateProperty] = useState<TS>(defaultValue);

  let value: TS = props[propName];
  const controlled: boolean = isControlled(value);

  const onChange =
    config && config.onChange ? config.onChange : props[`on${PropName}Change`] || emptyFn;
  const setter = (value: TS, ...args: any[]): void => {
    if (!controlled) {
      setStateProperty(value);
    }
    onChange(value, ...args);
  };

  if (!controlled) {
    value = stateValue;
  }

  return [value, setter];
};

export default useProperty;
