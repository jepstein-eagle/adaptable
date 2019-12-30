import XLSX from 'xlsx';
import Adaptable, {
  AdaptableNoCodeWizard as ABWizard,
} from '@adaptabletools/adaptable/agGrid';

import {
  AdaptableOptions,
  AdaptableApi,
  IAdaptableNoCodeWizardOptions,
} from '@adaptabletools/adaptable/types';

export const readJSONFile = async (file: File, toJSON?: (str: string) => Promise<any> | any) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = function(e) {
      try {
        const fn = toJSON || JSON.parse;
        const json = fn((e as any).target.result);

        Promise.resolve(json).then(resolve);
      } catch (ex) {
        reject('Invalid JSON');
      }
    };
    reader.onerror = function(e) {
      reject(e);
    };
    reader.readAsText(file);
  });
};

export const readExcelFile = (file: File): Promise<any> => {
  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  const asBinary: boolean = !!reader.readAsBinaryString;

  return new Promise((resolve, reject) => {
    reader.onload = (e: any) => {
      const wb = XLSX.read(e.target.result, { type: asBinary ? 'binary' : 'array' });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      resolve(data);
    };
    reader.onerror = reject;
    if (asBinary) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
};

export default class AdaptableNoCodeWizard {
  public static init(
    adaptableOptions: AdaptableOptions,
    extraOptions?: IAdaptableNoCodeWizardOptions
  ): Promise<AdaptableApi> {
    let adaptable;

    let isJSON: boolean;

    return new Promise((resolve, reject) => {
      const wizard = new ABWizard(adaptableOptions, {
        defaultActionMessage:
          'Click here to select an Excel or JSON file to load — or drag it here',

        fileAccept:
          '.json,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        readFile: (file: File): Promise<any> => {
          isJSON = (file.type && file.type.indexOf('json')) != -1 || file.name.endsWith('.json');
          if (isJSON) {
            return readJSONFile(file);
          }

          return readExcelFile(file);
        },
        ...extraOptions,
        onInit: ({ adaptableOptions, gridOptions }) => {
          let onInitResult;
          if (extraOptions && typeof extraOptions.onInit === 'function') {
            onInitResult = extraOptions.onInit({ adaptableOptions, gridOptions });
          }

          if (!(onInitResult instanceof Adaptable)) {
            adaptable = new Adaptable(adaptableOptions);
          } else {
            adaptable = onInitResult;
          }

          resolve(adaptable.api);

          return adaptable;
        },
      });
    });
  }
}
