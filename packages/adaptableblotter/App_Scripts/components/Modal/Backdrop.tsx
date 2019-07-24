import * as React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { useState, useLayoutEffect } from 'react';

export const baseClassName = 'ab-Modal';
export type TypeBackdropHandle = {
  id: string;
  setBackdropOrder: (visible: boolean, zIndex: number) => void;
};

const Backdrop = (props: {
  zIndex: number;
  uuid: string;
  timestamp: number;
  onBringToFront?: () => void;
}) => {
  const { uuid, timestamp } = props;
  const [backdropVisible, setBackdropVisible] = React.useState(false);
  const [zIndex, setZIndex] = useState<number>(-1);

  useLayoutEffect(() => {
    updatePositionInStack(uuid, {
      timestamp,
      baseZIndex: props.zIndex,
      setBackdropOrder: (visible: boolean, zIndex: number) => {
        unstable_batchedUpdates(() => {
          setBackdropVisible(visible);
          setZIndex(zIndex);
          if (visible && props.onBringToFront) {
            props.onBringToFront();
          }
        });
      },
    });

    return () => updatePositionInStack(uuid, null);
  }, []);

  return backdropVisible ? (
    <div data-id={uuid} style={{ zIndex }} className={`${baseClassName}-backdrop`} />
  ) : null;
};

type ModalStackingInfo = {
  timestamp: number;
  baseZIndex: number;
  setBackdropOrder: (visible: boolean, zIndex: number) => void;
};
const stack: { [key: string]: ModalStackingInfo } = {};

export const updatePositionInStack = (id: string, data?: ModalStackingInfo) => {
  stack[id] = data;

  if (!data) {
    delete stack[id];
  }

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
    data.setBackdropOrder(false, -1);
  });
  if (last) {
    last.setBackdropOrder(true, last.baseZIndex);
  }
};

export default Backdrop;
