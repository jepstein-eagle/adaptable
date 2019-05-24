import * as React from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import { useRef, useMemo, useState, MutableRefObject, useLayoutEffect } from 'react';
import join from '../utils/join';
import { RemoveScroll } from 'react-remove-scroll';
import { FlexProps, Flex } from 'rebass';

import { baseClassName, default as Backdrop } from './Backdrop';

const uuidv4 = require('uuid/v4');
const createUuid = (): string => uuidv4();

let portalElement: HTMLElement;
const ensurePortalElement = () => {
  if (!(global as any).document) {
    return;
  }
  if (portalElement) {
    return;
  }

  portalElement = document.createElement('div');

  document.body.appendChild(portalElement);
};

export type ModalProps = React.HTMLProps<HTMLElement> &
  FlexProps & {
    isOpen?: boolean;
    baseZIndex?: number;
    backdropZIndexOffset?: number;
  };

const Modal = (props: ModalProps) => {
  ensurePortalElement();

  const { className, style, children, isOpen, ...boxProps } = props;

  const timestamp = isOpen ? Date.now() : 0;
  const uuid: string = useMemo(() => createUuid(), []);

  const backdropZIndexOffset = props.backdropZIndexOffset || 10;
  const zIndex = props.baseZIndex || 1000;

  return createPortal(
    isOpen ? (
      <>
        <RemoveScroll>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            {...boxProps}
            style={{ zIndex, ...style }}
            className={join(baseClassName, className)}
          >
            {children}
          </Flex>
        </RemoveScroll>
        <Backdrop timestamp={timestamp} uuid={uuid} zIndex={zIndex - backdropZIndexOffset} />
      </>
    ) : null,
    portalElement
  );
};

export default Modal;
