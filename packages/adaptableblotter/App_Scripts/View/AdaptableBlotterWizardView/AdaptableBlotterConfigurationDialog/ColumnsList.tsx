import * as React from 'react';

import useSelection from './useSelection';
import { IColItem } from '../../UIInterfaces';
import CheckBox from '../../../components/CheckBox';
import Radio from '../../../components/Radio';
import { AdaptableObjectRow } from '../../Components/AdaptableObjectRow';
import { AdaptableObjectCollection } from '../../Components/AdaptableObjectCollection';
import Dropdown from '../../../components/Dropdown';

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
const ColumnsList = ({
  columns: cols,
  handle,
  onValidityChange,
}: {
  onValidityChange: (valid: boolean) => any;
  handle: React.MutableRefObject<any>;
  columns: ({ field: string; type: string })[];
}) => {
  const [columns, setColumns] = React.useState(cols);

  const onColumnChange = (col: any, value: Boolean, property: string) => {
    col = { ...col, [property]: value };

    const cols = columns.map(c => {
      if (c.field === col.field) {
        return col;
      }
      return c;
    });

    setColumns(cols);
  };

  const onColumnBatchChange = (value: boolean, property: string) => {
    const cols = columns.map(c => ({ ...c, [property]: value }));

    setColumns(cols);
  };

  const onColumnTypeChange = (col: { field: string; type: string }, type: string) => {
    const cols = columns.map(c => {
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
    getColumns: () => columns.filter(col => isIncludedColumn(col.field)),
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
          <CheckBox
            checked={allIncluded ? true : allExcluded ? false : null}
            onChange={allIncluded => {
              if (allIncluded) {
                includeAllColumns();
              } else {
                excludeAllColumns();
              }
            }}
          >
            Included
          </CheckBox>
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
          {' '}
          <CheckBox
            checked={isAllSortableColumns() ? true : isNoneSortableColumns() ? false : null}
            onChange={allSortable => {
              if (allSortable) {
                setAllSortable();
              } else {
                setAllUnsortable();
              }
            }}
          >
            Sortable
          </CheckBox>
        </b>
      ),
      Size: 3,
    },
    {
      key: 'editable',
      Content: (
        <b>
          {' '}
          <CheckBox
            checked={isAllEditableColumns() ? true : isNoneEditableColumns() ? false : null}
            onChange={allEditable => {
              if (allEditable) {
                setAllEditable();
              } else {
                setAllUneditable();
              }
            }}
          >
            Editable
          </CheckBox>
        </b>
      ),
      Size: 3,
    },
    {
      Size: 3,
      key: 'resizable',
      Content: (
        <b>
          {' '}
          <CheckBox
            checked={isAllResizableColumns() ? true : isNoneResizableColumns() ? false : null}
            onChange={allResizable => {
              if (allResizable) {
                setAllResizable();
              } else {
                setAllUnresizable();
              }
            }}
          >
            Resizable
          </CheckBox>
        </b>
      ),
    },
    {
      Content: (
        <b>
          {' '}
          <CheckBox
            checked={isAllFilterableColumns() ? true : isNoneFilterableColumns() ? false : null}
            onChange={allFilterable => {
              if (allFilterable) {
                setAllFilterable();
              } else {
                setAllUnfilterable();
              }
            }}
          >
            Filterable
          </CheckBox>
        </b>
      ),
      Size: 3,
      key: 'filterable',
    },
  ];

  const items = columns.map((col: { field: string; type: string }, i: number) => {
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

    cItems[2].Content = col.field;
    cItems[3].Content = (
      <Dropdown
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
      style={{ display: 'flex', flexFlow: 'column', height: '100%' }}
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
