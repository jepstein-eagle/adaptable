import { useState } from 'react';

const toUpperFirst = (str: string): string => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

const isControlled = (value: any): boolean => value !== undefined;

const emptyFn = (): void => {};

/**
 *
 * useProperty can be used to easily manage a given prop - especially when you want to support both the controlled and the uncontrolled behviour.
 *
 * @param props - the props of the component
 * @param propName - the name of the property to manage
 * @param defaultValue? - a default value for the prop - especially useful when the prop you're targeting via `propName` is uncontrolled
 * @param config.onChange? - defaults to `props.on${PropName}Change` - useful when you want to be notified of when the property is changed - via the returned setter.
 * config.onChange is called for both controlled and uncontrolled prop.
 *
 * If the prop is uncontrolled, when the returned propSetter is called, the useProperty hook will update the state internally - you can be notified of this via config.onChange.
 *
 * If you don't have config.onChange specified, the useProperty hook will try to call `props.on${PropName}Change` if it's defined.
 *
 * So even for a controlled prop, if you respect this convention and have this pair `${propName}` + `on${PropName}Change` - useProperty will do all the work and call the "event" handler prop for you.
 *
 * Returns [propValue, propSetterFunction] - the value of the prop and a setter function
 */
const useProperty = <TS>(
  props: any,
  propName: string,
  defaultValue?: any | undefined,
  config?: { onChange?: (value: TS, ...args: any[]) => void }
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
