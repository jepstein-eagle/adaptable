import * as React from 'react';

import { Box, BoxProps } from 'rebass';
import join from '../utils/join';

export const baseClassName = 'ab-ErrorBox';

const ErrorBox = (props: BoxProps) => {
  return <Box {...props} className={join(props.className, baseClassName)} />;
};

export default ErrorBox;
