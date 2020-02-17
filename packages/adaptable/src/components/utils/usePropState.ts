import { Dispatch, SetStateAction, useState } from 'react';

export default function usePropState<S>(
  state: S | undefined,
  setState: Dispatch<SetStateAction<S>> | undefined,
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [localState, setLocalState] = useState<S>(initialState);
  return [
    state !== undefined ? state : localState,
    setState !== undefined ? setState : setLocalState,
  ];
}
