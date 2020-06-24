import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import XLSX from 'xlsx';

import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { AdaptableNoCodeWizard } from '../../../../src/agGrid/Adaptable';

/*
Basic demo of wizard that allow d&d of a json with an array contents
*/

async function InitAdaptableDemo() {
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'dtmKey', // will be added later ...
    //adaptableId: 'Position Monitor',
    userName: 'No Data User',
    predefinedConfig: demoConfig,
  };
  new AdaptableNoCodeWizard(adaptableOptions, {
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
