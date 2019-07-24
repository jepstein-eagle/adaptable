import styled from 'styled-components';
import { Flex } from 'rebass';

const FieldWrap = styled(Flex)({
  border: '1px solid var(--ab-color-inputborder)',
  borderRadius: 'var(--ab-space-1)',
  overflow: 'hidden',
  '&:focus-within': {
    boxShadow: 'var(--ab-focus__box-shadow)',
  },
  '& input, & select, & > *': {
    border: 'none',
    flex: 1,
  },
  '& input, & select': {
    outline: 'none !important',
    boxShadow: 'none !important',
  },
});

FieldWrap.defaultProps = {
  flexDirection: 'row',
  alignItems: 'center',
};

export default FieldWrap;
