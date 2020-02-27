import * as React from 'react';

import useSelection from './useSelection';
import { IColItem } from '../../UIInterfaces';
import CheckBox from '../../../components/CheckBox';
import Radio from '../../../components/Radio';
import { AdaptableObjectRow } from '../../Components/AdaptableObjectRow';
import { AdaptableObjectCollection } from '../../Components/AdaptableObjectCollection';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import { humanize } from '../../../Utilities/Helpers/Helper';
import { useRef, useState } from 'react';

const dataTypes = [
  {
    value: 'abColDefString',
    label: 'Text (string)',
  },
  { value: 'abColDefNumber', label: 'Number' },
  {
    value: 'abColDefDate',
    label: 'Date',
  },
  {
    value: 'abColDefBoolean',
    label: 'Boolean',
  },
];

const inputStyle = { width: '100%', minWidth: 50, textAlign: 'start' as 'start' };

interface Column {
  field: string;
  type: string;
  caption?: string;
}

const useForceRender = () => {
  const [, setNow] = useState(Date.now());
  return () => {
    setNow(Date.now());
  };
};

const ColumnsList = ({
  columns: cols,
  handle,
  onValidityChange,
}: {
  onValidityChange: (valid: boolean) => any;
  handle: React.MutableRefObject<any>;
  columns: Column[];
}) => {
  const rerender = useForceRender();
  const columnsRef = useRef(cols);

  const silentSetColumns = (columns: Column[]) => {
    columnsRef.current = columns;
  };

  const setColumns = (columns: Column[]) => {
    silentSetColumns(columns);
    rerender();
  };

  const getColumns = () => columnsRef.current;

  const columns = columnsRef.current;

  const onColumnChange = (col: any, value: Boolean, property: string) => {
    col = { ...col, [property]: value };

    const cols = getColumns().map(c => {
      if (c.field === col.field) {
        return col;
      }
      return c;
    });

    setColumns(cols);
  };

  const onColumnBatchChange = (value: boolean, property: string) => {
    const cols = getColumns().map(c => ({ ...c, [property]: value }));

    setColumns(cols);
  };

  const setColumnCaption = (caption: string, field: string) => {
    const cols = getColumns().map(c => {
      if (c.field === field) {
        const newCol = { ...c, caption };

        return newCol;
      }
      return c;
    });

    silentSetColumns(cols);
  };

  const onColumnTypeChange = (col: Column, type: string) => {
    const cols = getColumns().map(c => {
      if (c.field === col.field) {
        return { ...c, type };
      }
      return c;
    });

    setColumns(cols);
  };

  const [primaryKeyField, setPrimaryKeyField] = React.useState(columns[0].field);
  const {
    selected: includedColumnsMap,
    isSelected: isIncludedColumn,
    isAllSelected: isAllIncludedColumns,
    isNoneSelected: isNoneIncludedColumns,
    selectColumn: includeColumn,
    deselectColumn: excludeColumn,
    selectAll: includeAllColumns,
    deselectAll: excludeAllColumns,
  } = useSelection(columns, true, null);

  handle.current = {
    getColumns: () => getColumns().filter(col => isIncludedColumn(col.field)),
    getPrimaryKey: () => primaryKeyField,
  };

  const {
    isSelected: isSortableColumn,
    isAllSelected: isAllSortableColumns,
    isNoneSelected: isNoneSortableColumns,
    selectColumn: setSortableColumn,
    deselectColumn: setUnsortableColumn,
    selectAll: setAllSortable,
    deselectAll: setAllUnsortable,
  } = useSelection(columns, true, 'sortable', {
    onBatchChange: (flag: boolean) => {
      onColumnBatchChange(flag, 'sortable');
    },
    onChange: (col, flag: boolean) => {
      onColumnChange(col, flag, 'sortable');
    },
  });

  const {
    isSelected: isGroupableColumn,
    isAllSelected: isAllGroupableColumns,
    isNoneSelected: isNoneGroupableColumns,
    selectColumn: setGroupableColumn,
    deselectColumn: setUngroupableColumn,
    selectAll: setAllGroupable,
    deselectAll: setAllUngroupable,
  } = useSelection(columns, true, 'enableRowGroup', {
    onBatchChange: (flag: boolean) => {
      onColumnBatchChange(flag, 'enableRowGroup');
    },
    onChange: (col, flag: boolean) => {
      onColumnChange(col, flag, 'enableRowGroup');
    },
  });

  const {
    isSelected: isResizableColumn,
    isAllSelected: isAllResizableColumns,
    isNoneSelected: isNoneResizableColumns,
    selectColumn: setResizableColumn,
    deselectColumn: setUnresizableColumn,
    selectAll: setAllResizable,
    deselectAll: setAllUnresizable,
  } = useSelection(columns, true, 'resizable', {
    onBatchChange: (flag: boolean) => {
      onColumnBatchChange(flag, 'resizable');
    },
    onChange: (col, flag: boolean) => {
      onColumnChange(col, flag, 'resizable');
    },
  });
  const {
    isSelected: isEditableColumn,
    isAllSelected: isAllEditableColumns,
    isNoneSelected: isNoneEditableColumns,
    selectColumn: setEditableColumn,
    deselectColumn: setUneditableColumn,
    selectAll: setAllEditable,
    deselectAll: setAllUneditable,
  } = useSelection(columns, true, 'editable', {
    onBatchChange: (flag: boolean) => {
      onColumnBatchChange(flag, 'editable');
    },
    onChange: (col, flag: boolean) => {
      onColumnChange(col, flag, 'editable');
    },
  });

  const {
    isSelected: isFilterableColumn,
    isAllSelected: isAllFilterableColumns,
    isNoneSelected: isNoneFilterableColumns,
    selectColumn: setFilterableColumn,
    deselectColumn: setUnFilterableColumn,
    selectAll: setAllFilterable,
    deselectAll: setAllUnfilterable,
  } = useSelection(columns, true, 'filter', {
    onBatchChange: (flag: boolean) => {
      onColumnBatchChange(flag, 'filter');
    },
    onChange: (col, flag: boolean) => {
      onColumnChange(col, flag, 'filter');
    },
  });

  const allIncluded = isAllIncludedColumns();
  const allExcluded = isNoneIncludedColumns();

  const colItems: IColItem[] = [
    { Content: 'Primary Key', Size: 3, key: 'pk' },
    {
      key: 'included',
      Content: (
        <b>
          <div>Included</div>
          <CheckBox
            checked={allIncluded ? true : allExcluded ? false : null}
            onChange={allIncluded => {
              if (allIncluded) {
                includeAllColumns();
              } else {
                excludeAllColumns();
              }
            }}
          ></CheckBox>
        </b>
      ),
      Size: 3,
    },
    { Content: 'Field', Size: 5, key: 'field' },
    { Content: 'Type', Size: 4, key: 'size' },
    {
      key: 'sortable',
      Content: (
        <b>
          <div>Sortable</div>
          <CheckBox
            checked={isAllSortableColumns() ? true : isNoneSortableColumns() ? false : null}
            onChange={allSortable => {
              if (allSortable) {
                setAllSortable();
              } else {
                setAllUnsortable();
              }
            }}
          ></CheckBox>
        </b>
      ),
      Size: 3,
    },
    {
      key: 'editable',
      Content: (
        <b>
          <div>Editable</div>
          <CheckBox
            checked={isAllEditableColumns() ? true : isNoneEditableColumns() ? false : null}
            onChange={allEditable => {
              if (allEditable) {
                setAllEditable();
              } else {
                setAllUneditable();
              }
            }}
          ></CheckBox>
        </b>
      ),
      Size: 3,
    },
    {
      Size: 3,
      key: 'resizable',
      Content: (
        <b>
          <div>Resizable</div>
          <CheckBox
            checked={isAllResizableColumns() ? true : isNoneResizableColumns() ? false : null}
            onChange={allResizable => {
              if (allResizable) {
                setAllResizable();
              } else {
                setAllUnresizable();
              }
            }}
          ></CheckBox>
        </b>
      ),
    },
    {
      Size: 3,
      key: 'enableRowGroup',
      Content: (
        <b>
          <div>Groupable</div>
          <CheckBox
            checked={isAllGroupableColumns() ? true : isNoneGroupableColumns() ? false : null}
            onChange={allGroupable => {
              if (allGroupable) {
                setAllGroupable();
              } else {
                setAllUngroupable();
              }
            }}
          ></CheckBox>
        </b>
      ),
    },
    {
      Content: (
        <b>
          <div>Filterable</div>
          <CheckBox
            checked={isAllFilterableColumns() ? true : isNoneFilterableColumns() ? false : null}
            onChange={allFilterable => {
              if (allFilterable) {
                setAllFilterable();
              } else {
                setAllUnfilterable();
              }
            }}
          ></CheckBox>
        </b>
      ),
      Size: 3,
      key: 'filterable',
    },
  ];

  const items = columns.map((col: Column) => {
    const isPrimaryKey = col.field === primaryKeyField;
    const cItems = colItems.map(c => ({
      ...c,
    }));
    cItems[0].Content = (
      <Radio
        checked={isPrimaryKey}
        onChange={checked => {
          if (checked && isIncludedColumn(col.field)) {
            setPrimaryKeyField(col.field);
          }
        }}
      />
    );
    cItems[1].Content = (
      <CheckBox
        checked={isIncludedColumn(col.field)}
        onChange={included => {
          if (included) {
            includeColumn(col.field);
          } else {
            excludeColumn(col.field);
          }
        }}
      />
    );

    const humanized = humanize(col.field);
    cItems[2].Content = (
      <Input
        style={inputStyle}
        defaultValue={col.caption != undefined ? col.caption : humanized}
        placeholder={humanized}
        onChange={(event: React.FormEvent) => {
          setColumnCaption((event.target as any).value as string, col.field);
        }}
      />
    );
    cItems[3].Content = (
      <Dropdown
        style={inputStyle}
        showClearButton={false}
        options={dataTypes}
        value={col.type}
        onChange={onColumnTypeChange.bind(null, col)}
      />
    );
    cItems[4].Content = (
      <CheckBox
        checked={isSortableColumn(col.field)}
        onChange={sortable => {
          sortable ? setSortableColumn(col.field) : setUnsortableColumn(col.field);
        }}
      />
    );
    cItems[5].Content = (
      <CheckBox
        checked={isEditableColumn(col.field)}
        onChange={editable => {
          editable ? setEditableColumn(col.field) : setUneditableColumn(col.field);
        }}
      />
    );
    cItems[6].Content = (
      <CheckBox
        checked={isResizableColumn(col.field)}
        onChange={resizable => {
          resizable ? setResizableColumn(col.field) : setUnresizableColumn(col.field);
        }}
      />
    );
    cItems[7].Content = (
      <CheckBox
        checked={isGroupableColumn(col.field)}
        onChange={groupable => {
          groupable ? setGroupableColumn(col.field) : setUngroupableColumn(col.field);
        }}
      />
    );

    cItems[8].Content = (
      <CheckBox
        checked={isFilterableColumn(col.field)}
        onChange={filterable => {
          filterable ? setFilterableColumn(col.field) : setUnFilterableColumn(col.field);
        }}
      />
    );

    return <AdaptableObjectRow key={col.field} colItems={cItems} style={{ cursor: 'pointer' }} />;
  });

  React.useEffect(() => {
    onValidityChange(isIncludedColumn(primaryKeyField));
  }, [includedColumnsMap, primaryKeyField]);

  return (
    <AdaptableObjectCollection
      headerAlign="flex-start"
      style={{
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
        textAlign: 'center',
      }}
      colItems={colItems}
      items={items}
    ></AdaptableObjectCollection>
  );
};

function areEqual() {
  /**
   * Make the ColumnList not render on subsequent prop changes
   * in order to boost performance
   */
  return true;
}
export default React.memo(ColumnsList, areEqual);
