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
    <path
      clipPath="url(#b)"
      d="M17.63 5.84C17.27 5.33 16.67 5 16 5H5C3.9 5 3 5.9 3 7V17C3 18.11 3.9 19 5 19H16C16.67 19 17.27 18.66 17.63 18.15L22 12L17.63 5.84M8.45 8.03C9.23 8.03 9.87 8.67 9.87 9.45S9.23 10.87 8.45 10.87 7.03 10.23 7.03 9.45 7.67 8.03 8.45 8.03M13.55 15.97C12.77 15.97 12.13 15.33 12.13 14.55S12.77 13.13 13.55 13.13 14.97 13.77 14.97 14.55 14.33 15.97 13.55 15.97M8.2 16L7 14.8L13.8 8L15 9.2L8.2 16Z"
    />
  </DefaultIcon>
);

// M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z
