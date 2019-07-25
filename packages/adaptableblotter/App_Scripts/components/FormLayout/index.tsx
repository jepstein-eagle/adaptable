import * as React from 'react';
import { Box, BoxProps } from 'rebass';
import { createContext, useContext, ReactNode } from 'react';
import { ReactComponentLike } from 'prop-types';
import { merge } from 'lodash';
import join from '../utils/join';

const FormLayoutContext = createContext(null);

type FormColumn = {
  name: string;
  component?: ReactComponentLike;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
};
type TypeFormLayout = {
  childrenToColumns?: boolean;
  defaultComponent?: ReactComponentLike;
  columns?: (string | number | FormColumn)[];
  placeholder?: ReactNode;
  sizes?: (string | number)[];
  style?: React.CSSProperties;
  gridRowGap?: string | number;
  gridColumnGap?: string | number;
};

export type FormLayoutColumn = FormColumn;
interface FormLayoutProps extends Omit<BoxProps, keyof TypeFormLayout>, TypeFormLayout {}

const defaultColumns: { [k: string]: Partial<FormColumn> } = {
  label: {
    className: 'ab-FormLayout_column--label',
    style: {
      textAlign: 'end',
    },
  },
};

const PLACEHOLDER = <div />;

const FormLayout = (props: FormLayoutProps) => {
  let {
    placeholder = PLACEHOLDER,
    columns = ['label', 'children'],
    defaultComponent = Box,
    sizes = ['auto', '1fr'],
    gridColumnGap = 'var(--ab-space-2)',
    gridRowGap = 'var(--ab-space-2)',
    style,
    childrenToColumns = true,
    ...boxProps
  } = props;

  columns = columns.map((c: FormColumn) => {
    if (typeof c === 'string' || typeof c === 'number') {
      c = {
        name: `${c}`,
      } as FormColumn;
    }

    if (defaultColumns[c.name]) {
      c = merge({}, defaultColumns[c.name], c);
    }
    c.component = c.component === undefined ? defaultComponent : c.component;

    return c;
  });
  const formStyle: React.CSSProperties = {
    gridTemplateColumns: columns
      .map((column: FormColumn, i) => {
        if (column.size) {
          return `${column.size}`;
        }
        if (sizes[i] !== undefined) {
          return `${sizes[i]}`;
        }

        return 'auto';
      })
      .join(' '),
    gridRowGap,
    gridColumnGap,
    rowGap: gridRowGap,
    columnGap: gridColumnGap,
  };

  return (
    <FormLayoutContext.Provider
      value={{
        columns,
        currentRow: 0,
        childrenToColumns,
      }}
    >
      <Box
        {...boxProps}
        className={join(boxProps.className, 'ab-FormLayout')}
        style={{ ...style, ...formStyle }}
      ></Box>
    </FormLayoutContext.Provider>
  );
};

interface FormRowProps {
  [k: string]: React.ReactNode;
}

export const FormRow = (props: FormRowProps) => {
  const ctx = useContext(FormLayoutContext);
  const { columns, placeholder, childrenToColumns } = ctx;

  const rowIndex = ctx.currentRow;
  ctx.currentRow++;

  const children = React.Children.toArray(props.children);

  const columnValues = columns.map((column: FormColumn, columnIndex: number) => {
    const columnName = column.name;

    let item = props[columnName];
    if (item === undefined && childrenToColumns) {
      item = children.shift();
    }

    let value = item;
    if (item == null) {
      value = placeholder;
    }

    if (column.component != null) {
      const Cmp = column.component;
      return (
        <Cmp
          style={{ ...column.style, gridColumn: columnIndex + 1, gridRow: rowIndex + 1 }}
          className={column.className}
        >
          {value}
        </Cmp>
      );
    }
    return value;
  });

  return <>{columnValues}</>;
};

export default FormLayout;
