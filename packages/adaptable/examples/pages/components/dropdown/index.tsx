import Dropdown from '../../../../src/components/Dropdown';

import '../../../../src/base.scss';
import '../../../../src/components/Dropdown/base.scss';
import '../../../../src/components/Dropdown/style.scss';

import React, { useState } from 'react';

export default () => {
  if (!global.document) {
    return null;
  }
  const [value, setValue] = useState('');
  return (
    <Dropdown
      options={[
        { label: 'x', value: 'x' },
        { label: 'y', value: 'y' },
      ]}
      onChange={v => setValue(v)}
      value={value}
    />
  );
};
