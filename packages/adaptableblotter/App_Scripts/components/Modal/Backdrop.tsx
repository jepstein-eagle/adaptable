import * as React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { useState, MutableRefObject, useLayoutEffect } from 'react';

export const baseClassName = 'ab-Modal';
export type TypeBackdropHandle = {
  id: string;
  setBackdropVisible: (visible: boolean, zIndex: number) => void;
};

const Backdrop = ({
  handle,
  uuid,
  baseZIndex,
}: {
  uuid: string;
  baseZIndex: number;
  handle: MutableRefObject<TypeBackdropHandle>;
}) => {
  const [backdropVisible, setBackdropVisible] = React.useState(false);
  const [zIndex, setZIndex] = useState<number>(baseZIndex);

  useLayoutEffect(() => {
    if (handle) {
      handle.current = {
        id: uuid,
        setBackdropVisible: (visible: boolean, zIndex: number) => {
          unstable_batchedUpdates(() => {
            setBackdropVisible(visible);
            setZIndex(zIndex);
          });
        },
      };
    }
  }, []);

  return backdropVisible ? (
    <div data-id={uuid} style={{ zIndex }} className={`${baseClassName}-backdrop`} />
  ) : null;
};

type ModalStackingInfo = {
  timestamp: number;
  baseZIndex: number;
  setBackdropVisible: (visible: boolean, zIndex: number) => void;
};
const stack: { [key: string]: ModalStackingInfo } = {};

export const updatePositionInStack = (id: string, data: ModalStackingInfo) => {
  stack[id] = data;

  const pairs = Object.keys(stack).map((key: string) => {
    const data: ModalStackingInfo = stack[key];

    return {
      key,
      ...data,
    };
  });
  // sort pairs in ascending order
  pairs.sort((p1: { timestamp: number }, p2: { timestamp: number }) => p1.timestamp - p2.timestamp);

  const last = pairs.pop();
  pairs.forEach((data: ModalStackingInfo) => {
    data.setBackdropVisible(false, -1);
  });
  if (last) {
    last.setBackdropVisible(true, last.baseZIndex);
  }
};

export default Backdrop;
