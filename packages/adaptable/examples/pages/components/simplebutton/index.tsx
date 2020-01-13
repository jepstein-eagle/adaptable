import SimpleButton from '../../../../src/components/SimpleButton';
import DropdownButton from '../../../../src/components/DropdownButton';

import '../../../../src/base.scss';
import '../../../../src/components/SimpleButton/base.scss';
import '../../../../src/components/SimpleButton/style.scss';

import React, { useState } from 'react';

export default () => {
  if (!global.document) {
    return null;
  }
  return (
    <>
      <button
        onBlur={() => {
          console.log('xxx');
        }}
      >
        xxx
      </button>
      <SimpleButton
        onBlur={() => {
          console.log('BLUR');
        }}
      >
        Panel content here
      </SimpleButton>

      <DropdownButton
        items={[{ label: 'a' }, { label: 'b' }]}
        onBlur={() => {
          console.log('BLUR DD');
        }}
      >
        Panel content here
      </DropdownButton>
    </>
  );
};
