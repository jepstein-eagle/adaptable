import { GridOptions, GridOptionsWrapper } from 'ag-grid-community';

export interface WizardDataSourceInfo {
  columns: string[];
  data: any[];
  primaryKey?: string;
}
/**
 * There are two ways in which the datasource can be dropped in the wizard:
 *
 * 1. array of objects - eg: [{"lastName":"John","firstName":"Bobson"},{"lastName":"Mike","firstName":"Richardson"},...]
 * 2. array of arrays - eg: [["lastName","firstName"],["John","Bobson"],["Mike","Richardson"],...]
 *
 * Although the second one is more compact, the first one is what we need for the datasource of the grid,
 * so if we receive v2, we transform it to 1
 * @param json
 */
export const prepareDataSource = (json: any): WizardDataSourceInfo => {
  if (!Array.isArray(json) || !json.length) {
    return {
      primaryKey: undefined,
      columns: [],
      data: [],
    };
  }
  let columns: string[] = [];
  let data: any[] = [];
  let primaryKey: string;
  if (Array.isArray(json[0])) {
    // we are in v2, as described above, so this is the list of columns
    columns = json[0];

    for (let i = 1, len = json.length; i < len; i++) {
      const it = json[i];
      const obj: { [key: string]: any } = {};
      for (let j = 0; j < columns.length; j++) {
        obj[columns[j]] = it[j];
      }
      data.push(obj);
    }
  } else {
    columns = Object.keys(json[0]);
    data = json;
  }
  primaryKey = columns[0];
  return {
    primaryKey,
    columns,
    data,
  };
};

const typeToColType: { [key: string]: string } = {
  string: 'abColDefString',
  number: 'abColDefNumber',
  boolean: 'abColDefBoolean',
  date: 'abColDefDate',
};

const abColDefNumberArray = 'abColDefNumberArray';

export const getColTypeFromValue = (value: any): string => {
  const dataType: string = typeof value;
  let columnType = typeToColType[dataType] || typeToColType.string;

  if (value instanceof Date) {
    columnType = typeToColType.date;
  }

  if (Array.isArray(value) && value.length && typeof value[0] === 'number') {
    columnType = abColDefNumberArray;
  }
  return columnType;
};

export const prepareGridOptions = (dataSourceInfo: WizardDataSourceInfo): GridOptions => {
  const firstItem = dataSourceInfo.data[0];
  const columnDefs = dataSourceInfo.columns.map((columnName: string) => {
    const firstItemValue = firstItem[columnName];
    const columnType = getColTypeFromValue(firstItemValue);

    return {
      headerName: columnName,
      field: columnName,
      type: columnType,
      filter: true,
      sortable: true,
      resizable: true,
      editable: true,
    };
  });

  const gridOptions: GridOptions = {
    rowData: dataSourceInfo.data,
    columnDefs,
    floatingFilter: true,
    enableRangeSelection: true,
    rowSelection: 'multiple',
    rowHeight: 30,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefNumberArray: {},
      abColDefObject: {},
    },
  };

  return gridOptions;
};
