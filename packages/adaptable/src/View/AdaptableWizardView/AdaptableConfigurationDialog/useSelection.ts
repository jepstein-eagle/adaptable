import { useState } from 'react';

const useSelection = (
  columns: { [key: string]: any }[],
  defaultValue: boolean,
  fieldName: string | null,
  changeListeners?: {
    onChange?: (column: any, flag: boolean) => void;
    onBatchChange?: (flag: boolean) => void;
  }
) => {
  changeListeners = changeListeners || {};
  const onChange = changeListeners.onChange || ((column: any, flag: boolean) => {});
  const onBatchChange = changeListeners.onBatchChange || ((flag: boolean) => {});

  const [selected, setSelected] = useState<{ [key: string]: boolean }>(
    columns.reduce((acc, col) => {
      acc[col.field] = fieldName ? col[fieldName] : defaultValue;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const getColumn = (field: string) => columns.filter(c => c.field === field)[0];

  const result = {
    selected,
    isSelected: (field: string): boolean => !!selected[field],
    isAllSelected: (): boolean => Object.keys(selected).length === columns.length,
    isNoneSelected: (): boolean => Object.keys(selected).length === 0,
    selectColumn: (field: string) => {
      if (!selected[field]) {
        setSelected({
          ...selected,
          [field]: true,
        });
        onChange(getColumn(field), true);
      }
    },
    deselectColumn: (field: string) => {
      if (selected[field]) {
        const newSelected = { ...selected };
        delete newSelected[field];
        setSelected(newSelected);
        onChange(getColumn(field), false);
      }
    },
    toggleColumn: (field: string) => {
      if (result.isSelected(field)) {
        result.deselectColumn(field);
      } else {
        result.selectColumn(field);
      }
    },
    deselectAll: () => {
      setSelected({});
      columns.forEach(col => {
        onChange(col, false);
      });
      onBatchChange(false);
    },
    selectAll: () => {
      setSelected(
        columns.reduce((acc, col) => {
          acc[col.field] = true;

          return acc;
        }, {} as { [key: string]: boolean })
      );
      onBatchChange(true);
    },
  };

  return result;
};

export default useSelection;
