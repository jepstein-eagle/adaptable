import * as React from 'react';

import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import join from '../utils/join';
import usePrevious from '../utils/usePrevious';
import { BoxProps, Box } from 'rebass';
import { ModalProps, default as Modal } from '../Modal';
import useIsOpen from './useIsOpen';

export type DialogProps = BoxProps &
  React.HTMLProps<HTMLElement> & {
    modal?: boolean;
    autoFocus?: boolean;
    fixed?: boolean;
    modalProps?: ModalProps;
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    showCloseButton?: boolean;
    onDismiss?: () => void | Function;
  };

const baseClassName = 'ab-Dialog';

const Dialog = (props: DialogProps) => {
  let { modal, fixed, autoFocus, className, children, modalProps, ...boxProps } = props;
  modal = props.modal === undefined ? true : props.modal;
  fixed = props.fixed === undefined ? true : props.fixed;
  autoFocus = props.autoFocus === undefined ? true : props.autoFocus;

  const showCloseButton = props.showCloseButton === undefined ? true : props.showCloseButton;

  const [isOpen, setIsOpen] = useIsOpen(props);

  const boxRef = useRef<HTMLElement>(null);

  const prevAutoFocus = usePrevious(isOpen && autoFocus, undefined);

  useEffect(() => {
    if (
      boxRef.current &&
      isOpen &&
      autoFocus &&
      (prevAutoFocus === undefined || prevAutoFocus !== autoFocus)
    ) {
      boxRef.current.focus();
    }
  }, []);

  const onKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      const activeElement = document.activeElement;

      const ignoreTags: { [key: string]: number } = {
        input: 1,
        a: 1,
        button: 1,
      };
      if (activeElement && !!ignoreTags[activeElement.tagName]) {
        return;
      }

      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const closeButton = showCloseButton ? (
    <Box
      padding={1}
      title="Close dialog"
      onClick={() => setIsOpen(false)}
      className={`${baseClassName}__close-button`}
    >
      ×
    </Box>
  ) : null;

  const box = (
    <Box
      tabIndex={0}
      {...boxProps}
      onKeyDown={onKeyDown}
      className={join(
        baseClassName,
        modal ? `${baseClassName}--modal` : `${baseClassName}--not-modal`,
        className
      )}
      ref={boxRef}
    >
      {children}
      {closeButton}
    </Box>
  );

  const content = fixed ? <div className={`${baseClassName}-fixed-wrapper`}>{box}</div> : box;

  return modal ? (
    <Modal {...modalProps} isOpen={isOpen}>
      {box}
    </Modal>
  ) : (
    content
  );
};

export default Dialog;
