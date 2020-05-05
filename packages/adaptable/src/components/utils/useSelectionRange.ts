import { useState, useRef, useCallback, MutableRefObject } from 'react';

export default function useSelectionRange<T extends HTMLInputElement | HTMLTextAreaElement>(): [
  (node: T) => void,
  MutableRefObject<T>,
  number,
  number
] {
  const [range, setRange] = useState<[number, number]>([null, null]);

  const onSelectionChange = () => {
    const isActive = ref.current === document.activeElement;
    const start = isActive ? ref.current.selectionStart : null;
    const end = isActive ? ref.current.selectionEnd : null;
    setRange([start, end]);
  };

  const ref = useRef<T>();
  const refCallback = useCallback((newNode: T) => {
    const oldNode = ref.current;
    if (oldNode) document.removeEventListener('selectionchange', onSelectionChange);
    if (newNode) document.addEventListener('selectionchange', onSelectionChange);
    ref.current = newNode;
  }, []);

  return [refCallback, ref, range[0], range[1]];
}
