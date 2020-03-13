import useProperty from '../utils/useProperty';

export default (props: {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onDismiss?: () => void | Function;
}) => {
  return useProperty(props, 'isOpen', true, {
    onChange: isOpen => {
      if (!isOpen && props.onDismiss) {
        props.onDismiss();
      }
    },
  });
};
