import useProperty from '../utils/useProperty';

export default (props: {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onDismiss?: () => void | Function;
}) => {
  const [isOpen, setIsOpen] = useProperty(props, 'isOpen', true, {
    onChange: isOpen => {
      if (!isOpen && props.onDismiss) {
        props.onDismiss();
      }
    },
  });

  return [isOpen, setIsOpen];
};
