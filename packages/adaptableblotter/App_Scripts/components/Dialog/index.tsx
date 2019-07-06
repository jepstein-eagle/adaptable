import * as React from 'react';

import { useRef, useEffect } from 'react';
import join from '../utils/join';

import captureTabNavigation from '@rb/capture-tab-navigation';

import { BoxProps, Box } from 'rebass';
import { ModalProps, default as Modal } from '../Modal';
import useIsOpen from './useIsOpen';
import useAutoFocus from '../utils/useAutoFocus';

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
    dismissOnClickOutside?: () => void | Function;
  };

const baseClassName = 'ab-Dialog';

const Dialog = (props: DialogProps) => {
  let {
    modal,
    fixed,
    autoFocus,
    className,
    children,
    modalProps,
    dismissOnClickOutside = false,
    onDismiss,
    ...boxProps
  } = props;
  modal = props.modal === undefined ? true : props.modal;
  fixed = props.fixed === undefined ? true : props.fixed;

  const boxRef = useRef<HTMLElement>(null);
  useAutoFocus(
    {
      autoFocus: props.autoFocus,
      previous: ({ autoFocus }) => autoFocus && isOpen,
      shouldFocus: ({ autoFocus }) => autoFocus && isOpen,
    },
    boxRef
  );

  const showCloseButton = props.showCloseButton === undefined ? true : props.showCloseButton;

  const [isOpen, setIsOpen] = useIsOpen(props);

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
    <Modal {...modalProps} isOpen={isOpen}>
      {box}
    </Modal>
  ) : (
    content
  );
};

export default Dialog;
