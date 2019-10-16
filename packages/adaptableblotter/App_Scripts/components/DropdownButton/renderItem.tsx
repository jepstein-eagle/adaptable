import * as React from 'react';
import { isPlainObject } from 'lodash';
import DropdownButtonItem from './DropdownButtonItem';

type Params = {
  item: DropdownButtonItem;
  index: number;
  columns: string[];
  style: React.CSSProperties;
  className: string;
  idProperty?: string;
  onItemClick?: (...args: any[]) => void;
  domProps?: any;
};

export default ({
  domProps,
  item,
  onItemClick,
  index,
  columns,
  className,
  idProperty,
  style,
}: Params) => {
  const key = (item as any)[idProperty] || index;

  if (!isPlainObject(item)) {
    return (
      <tr onClick={onItemClick} key={key} className={className} {...domProps}>
        <td colSpan={columns.length} style={style}>
          {item}
        </td>
      </tr>
    );
  }

  return (
    <tr onClick={onItemClick} key={key} className={className} {...domProps}>
      {columns.map(col => {
        return (
          <td key={col} style={style}>
            {(item as any)[col]}
          </td>
        );
      })}
    </tr>
  );
};
