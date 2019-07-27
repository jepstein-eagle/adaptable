import * as React from 'react';
import { createPortal } from 'react-dom';
import { useMemo } from 'react';
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

export interface ModalProps extends FlexProps {
  isOpen?: boolean;
  baseZIndex?: number;
  backdropZIndexOffset?: number;
  onBringToFront?: () => void;
}

let globalCounter = 0;

const Modal = (props: ModalProps) => {
  ensurePortalElement();

  const { className, style, children, isOpen, onBringToFront, ...boxProps } = props;

  const uuid: string = useMemo(() => createUuid(), []);

  const counter = useMemo(() => globalCounter++, [isOpen]);
  const openTimestamp = counter;

  const backdropZIndexOffset = props.backdropZIndexOffset || 1;
  const zIndex = (props.baseZIndex || 1000) + counter;

  return createPortal(
    isOpen ? (
      <>
        <Backdrop
          timestamp={openTimestamp}
          uuid={uuid}
          zIndex={zIndex - backdropZIndexOffset}
          onBringToFront={onBringToFront}
        />
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
      </>
    ) : null,
    portalElement
  );
};

export default Modal;
