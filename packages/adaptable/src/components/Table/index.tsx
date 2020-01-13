import * as React from 'react';
import join from '../utils/join';
import { HTMLAttributes } from 'react';

const Table = (props: HTMLAttributes<HTMLTableElement>) => {
  return <table {...props} className={join(props.className, 'ab-Table')} />;
};

export default Table;
