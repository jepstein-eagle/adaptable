import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import XLSX from 'xlsx';

import { AdaptableWizard } from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';

/*
Basic demo of wizard that allow d&d of a json with an array contents
*/

function InitAdaptableBlotter() {
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'dtmKey', // will be added later ...
    //blotterId: 'Position Monitor',
    userName: 'No Data User',
    predefinedConfig: demoConfig,
  };
  new AdaptableWizard(adaptableBlotterOptions, {
    readFile: (file: File): Promise<any> => {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      return new Promise((resolve, reject) => {
        reader.onload = (e: any) => {
          // 	/* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
          // 	/* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          // 	/* Convert array of arrays */

          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

          resolve(data);
        };
        reader.onerror = reject;
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
      });
    },
    prepareData: data => {
      const columns = data[0];

      return {
        columns,
        primaryKey: columns[0],
        data: data.slice(1).map((data: any) => {
          return columns.reduce((acc: any, colName: string, index: number) => {
            acc[colName] = data[index];
            return acc;
          }, {});
        }),
      };
    },
  });
}

let demoConfig: PredefinedConfig = {
  Theme: {
    CurrentTheme: 'dark',
  },
};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
