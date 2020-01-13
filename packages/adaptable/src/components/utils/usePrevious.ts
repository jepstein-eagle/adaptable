import { useRef, useEffect } from 'react';
const usePrevious = <T>(value: T, initialValue: T): T => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
export default usePrevious;
