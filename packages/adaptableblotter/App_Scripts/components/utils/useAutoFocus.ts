import { useEffect, MutableRefObject } from 'react';
import usePrevious from './usePrevious';

const useAutoFocus = (
  props: {
    autoFocus?: boolean;
    isOpen?: boolean;
    previous?: ({ autoFocus }: { autoFocus: boolean }) => boolean;
    shouldFocus?: ({ autoFocus }: { autoFocus: boolean }) => boolean;
  },
  focusElementRef: MutableRefObject<HTMLElement>
) => {
  const autoFocus = props.autoFocus === undefined ? true : props.autoFocus;

  const prevAutoFocus = usePrevious(
    props.previous ? props.previous({ autoFocus }) : autoFocus,
    undefined
  );

  useEffect(() => {
    if (
      focusElementRef.current &&
      focusElementRef.current.focus &&
      autoFocus &&
      (props.shouldFocus ? props.shouldFocus({ autoFocus }) : true) &&
      (prevAutoFocus === undefined || prevAutoFocus !== autoFocus)
    ) {
      focusElementRef.current.focus();
    }
  }, [autoFocus, prevAutoFocus, props.isOpen]);
};

export default useAutoFocus;
