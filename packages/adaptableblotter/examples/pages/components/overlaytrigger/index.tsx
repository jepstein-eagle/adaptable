import OverlayTrigger from '../../../../App_Scripts/components/OverlayTrigger';

import '../../../../App_Scripts/base-new.scss';

import React, { useState } from 'react';
import { Button } from 'rebass';

export default () => {
  if (!global.document) {
    return null;
  }
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <h2>test</h2>

      <OverlayTrigger render={() => <b>xxx button</b>}>
        <Button marginBottom={'700px'}>xxx</Button>
      </OverlayTrigger>
    </div>
  );
};
