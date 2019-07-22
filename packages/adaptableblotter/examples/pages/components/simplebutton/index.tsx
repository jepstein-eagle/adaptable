import SimpleButton from '../../../../App_Scripts/components/SimpleButton';
import DropdownButton from '../../../../App_Scripts/components/DropdownButton';

import '../../../../App_Scripts/base-new.scss';
import '../../../../App_Scripts/components/SimpleButton/base.scss';
import '../../../../App_Scripts/components/SimpleButton/style.scss';

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
