import * as React from 'react';
import DefaultIcon from './DefaultIcon';
export default (props: any) => (
  <DefaultIcon {...props}>
    <defs>
      <path id="a" d="M0 0h24v24H0V0z" />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path d="M4 9h16v2H4zm0 4h10v2H4z" clipPath="url(#b)" />
  </DefaultIcon>
);
