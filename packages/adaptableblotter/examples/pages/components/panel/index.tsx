import Panel from '../../../../App_Scripts/components/Panel';

import '../../../../App_Scripts/base-new.scss';
import '../../../../App_Scripts/components/Panel/base.scss';
import '../../../../App_Scripts/components/Panel/style.scss';

import React, { useState } from 'react';

export default () => {
  if (!global.document) {
    return null;
  }
  const [visible, setVisible] = useState(true);
  const toggle = () => setVisible(!visible);
  return (
    <div>
      <button onClick={toggle}>toggle Panel</button> - {visible ? 'visible' : 'hidden'}
      <Panel header="xxx">Panel content here</Panel>
    </div>
  );
};
