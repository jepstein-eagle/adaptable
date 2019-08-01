import * as React from 'react';

import { useRef, useEffect } from 'react';
import join from '../utils/join';
import contains from '../utils/contains';

import captureTabNavigation from '../utils/captureTabNavigation';

import { BoxProps, Box } from 'rebass';
import { ModalProps, default as Modal } from '../Modal';
import useIsOpen from './useIsOpen';
import useAutoFocus from '../utils/useAutoFocus';

type TypeProps = {
  modal?: boolean;
  autoFocus?: boolean;
  fixed?: boolean;
  modalProps?: ModalProps;
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  showCloseButton?: boolean;
  onDismiss?: () => void;
  dismissOnClickOutside?: boolean;
};

export interface DialogProps extends BoxProps, TypeProps {}

const baseClassName = 'ab-Dialog';

const Dialog = (props: DialogProps) => {
  let {
    modal,
    fixed,
    autoFocus = true,
    className,
    children,
    modalProps,
    dismissOnClickOutside = false,
    onDismiss,
    ...boxProps
  } = props;
  modal = props.modal === undefined ? true : props.modal;
  fixed = props.fixed === undefined ? true : props.fixed;

  const [isOpen, setIsOpen] = useIsOpen(props);
  const boxRef = useRef<HTMLElement>(null);
  useAutoFocus(
    {
      isOpen,
      autoFocus: props.autoFocus,
      previous: ({ autoFocus }) => autoFocus && isOpen,
      shouldFocus: ({ autoFocus }) => autoFocus && isOpen,
    },
    boxRef
  );

  const showCloseButton = props.showCloseButton === undefined ? true : props.showCloseButton;

  const onKeyDown = (e: any) => {
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
    captureTabNavigation(boxRef.current, e);
    if (e.key === 'Escape') {
      if (e.nativeEvent.anotherModalClosed) {
        return;
      }
      e.nativeEvent.anotherModalClosed = true;
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

    captureTabNavigation(boxRef.current, event);
  };

  useEffect(() => {
    if (dismissOnClickOutside && isOpen) {
      const dismissDialog = (e: any) => {
        requestAnimationFrame(() => {
          if (e.preventDialogDismiss) {
            return;
          }

          setIsOpen(false);
        });
      };
      document.documentElement.addEventListener('click', dismissDialog, {
        passive: true,
        capture: false,
      });
      return () => {
        document.documentElement.removeEventListener('click', dismissDialog);
      };
    }
  }, [isOpen, dismissOnClickOutside]);

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

  const setPreventDismissFlag = (e: React.SyntheticEvent) => {
    if (dismissOnClickOutside) {
      (e.nativeEvent as any).preventDialogDismiss = true;
    }
  };

  const box = (
    <Box
      tabIndex={0}
      {...boxProps}
      onClick={(e: React.SyntheticEvent) => {
        setPreventDismissFlag(e);
        if (boxProps && boxProps.onClick) {
          boxProps.onClick(e as any);
        }
      }}
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

  const content = fixed ? (
    <div onClick={setPreventDismissFlag} className={`${baseClassName}-fixed-wrapper`}>
      {box}
    </div>
  ) : (
    box
  );

  return modal ? (
    <Modal
      {...modalProps}
      isOpen={isOpen}
      onBringToFront={() => {
        if (
          boxRef.current &&
          boxRef.current.focus &&
          (!document.activeElement || !contains(boxRef.current, document.activeElement!))
        ) {
          boxRef.current.focus();
        }
      }}
    >
      {box}
    </Modal>
  ) : (
    content
  );
};

export default Dialog;
