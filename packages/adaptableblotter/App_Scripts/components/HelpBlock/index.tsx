import * as React from 'react';

import { Box, BoxProps } from 'rebass';
import join from '../utils/join';

export const baseClassName = 'ab-HelpBlock';

const HelpBlock = (props: BoxProps) => {
  return <Box {...props} className={join(props.className, baseClassName)} />;
};

export default HelpBlock;
