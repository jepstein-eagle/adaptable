import Dialog from '../../../../App_Scripts/components/Dialog';

import '../../../../App_Scripts/base-new.scss';
import '../../../../App_Scripts/components/Dialog/base.scss';
import '../../../../App_Scripts/components/Dialog/style.scss';

import React, { useState } from 'react';

export default () => {
  if (!global.document) {
    return null;
  }
  const [visible, setVisible] = useState(true);
  const toggle = () => setVisible(!visible);
  return (
    <div>
      <button onClick={toggle}>toggle dialog</button> - {visible ? 'visible' : 'hidden'}
      <Dialog modal={false} fixed={false} style={{ border: '1px solid red' }}>
        dialog content here
      </Dialog>
    </div>
  );
};
