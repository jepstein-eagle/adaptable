import Dropdown from '../../../../App_Scripts/components/Dropdown';

import '../../../../App_Scripts/base-new.scss';
import '../../../../App_Scripts/components/Dropdown/base.scss';
import '../../../../App_Scripts/components/Dropdown/style.scss';

import React, { useState } from 'react';

export default () => {
  if (!global.document) {
    return null;
  }
  const [value, setValue] = useState('');
  return (
    <Dropdown
      options={[{ label: 'x', value: 'x' }, { label: 'y', value: 'y' }]}
      onChange={v => setValue(v)}
      value={value}
    />
  );
};
