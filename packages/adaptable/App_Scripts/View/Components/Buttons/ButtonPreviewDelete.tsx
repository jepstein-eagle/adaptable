import * as React from 'react';

import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export default (props: SimpleButtonProps) => {
  return <SimpleButton {...props} icon={'trash'} variant="text" />;
};
