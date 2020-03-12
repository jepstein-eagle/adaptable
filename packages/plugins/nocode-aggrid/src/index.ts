import { read as XLSXRead, utils as XLSXUtils } from 'xlsx';
import { AdaptableNoCodeWizard } from '@adaptabletools/adaptable/agGrid';
import { AdaptablePlugin, AdaptableOptions } from '@adaptabletools/adaptable/types';

import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-nocode" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

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
      const wb = XLSXRead(e.target.result, { type: asBinary ? 'binary' : 'array' });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const data = XLSXUtils.sheet_to_json(ws, { header: 1 });

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

const defaultOptions = {};

interface NoCodePluginOptions {
  modules?: any[];
  onInit?: (adaptableOptions: AdaptableOptions) => void | Promise<any>;
  headerMessage?: React.ReactNode;
  actionMessage?: React.ReactNode;
  dropActionMessage?: React.ReactNode;
  loadingMessage?: React.ReactNode;
  theme?: 'dark' | 'light';
}

class NoCodePlugin extends AdaptablePlugin {
  public options: NoCodePluginOptions;
  public pluginId: string = 'nocode-aggrid';

  constructor(options?: NoCodePluginOptions) {
    super(options);
    this.options = { ...defaultOptions, ...options };
  }

  beforeInit(adaptableOptions: AdaptableOptions) {
    const theme =
      (this.options.theme as string) ||
      (typeof adaptableOptions.predefinedConfig === 'object' &&
      adaptableOptions.predefinedConfig.Theme &&
      adaptableOptions.predefinedConfig.Theme.CurrentTheme
        ? adaptableOptions.predefinedConfig.Theme.CurrentTheme
        : null);

    if (theme) {
      document.documentElement.classList.add(`ab--theme-${theme}`);
    }
    let isJSON: boolean;

    return new Promise(resolve => {
      new AdaptableNoCodeWizard(adaptableOptions, {
        fileAccept:
          '.json,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',

        helpText: this.options.headerMessage,
        defaultActionMessage:
          this.options.actionMessage ||
          'Click here to select an Excel or JSON file to load — or drag it here',
        dragOverActionMessage: this.options.dropActionMessage,
        loadingMessage: this.options.loadingMessage,
        readFile: (file: File): Promise<any> => {
          isJSON = (file.type && file.type.indexOf('json')) != -1 || file.name.endsWith('.json');
          if (isJSON) {
            return readJSONFile(file);
          }

          return readExcelFile(file);
        },

        onInit: ({ gridOptions, adaptableOptions: newAdaptableOptions }) => {
          Object.keys(newAdaptableOptions).forEach((key: string) => {
            (adaptableOptions as any)[key] = (newAdaptableOptions as any)[key];
          });

          adaptableOptions.vendorGrid = gridOptions;
          if (this.options.modules) {
            adaptableOptions.vendorGrid.modules = this.options.modules;
          }

          let onInitResult: Promise<any> | void = Promise.resolve(true);

          if (this.options.onInit) {
            onInitResult = this.options.onInit(adaptableOptions);
          }
          if (onInitResult && onInitResult.then) {
            onInitResult.then(() => {
              requestAnimationFrame(resolve);
            });
          } else {
            requestAnimationFrame(resolve);
          }

          return null;
        },
      });
    });
  }
}

export default (options?: NoCodePluginOptions) => new NoCodePlugin(options);
