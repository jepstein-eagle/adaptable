import React, { useState } from 'react';
import Changelog from '../../../../src/Utilities/Services/DataService/Changelog';
import { DataChangedInfo } from '../../../../src/types';

const c = new Changelog({});

(globalThis as any).c = c;

c.put(({
  PrimaryKeyValue: 13,
  Timestamp: 3,
} as any) as DataChangedInfo);

c.put(({
  PrimaryKeyValue: 11,
  Timestamp: 5,
} as any) as DataChangedInfo);

c.put(({
  PrimaryKeyValue: 11,
  Timestamp: 8,
} as any) as DataChangedInfo);

c.put(({
  PrimaryKeyValue: 11,
  Timestamp: 10,
} as any) as DataChangedInfo);

console.log(JSON.stringify(c.getChangesSince(0)), '!!!');
export default () => {
  if (!(global as any).document) {
    return null;
  }
  return <div>xxx</div>;
};
