import * as React from 'react';

import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export default (props: SimpleButtonProps) => {
  return (
    <SimpleButton
      {...props}
      icon={'trash'}
      variant="text"
      className={props.className + StyleConstants.PREVIEW_DELETE_ITEM_BUTTON}
    />
  );
};
