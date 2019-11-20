import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  IAdaptableBlotter,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);

var adaptableblotter: IAdaptableBlotter;
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  // gridOptions.getContextMenuItems = getContextMenuItems;

  //gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'user menu demo'
  );
  adaptableBlotterOptions.predefinedConfig = demoConfig;

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  UserInterface: {
    ColumnMenuItems: [
      {
        Label: 'Column Menu 1',
        UserMenuItemClickedFunction: () => {
          alert('Ive been clicked');
        },
        Icon:
          '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/gb.png"/>',
      },
      {
        Label: 'Column Menu 2',
      },
      {
        Label: 'Column Menu 3',
        SubMenuItems: [
          {
            Label: 'Column Sub Menu 1',
          },
          {
            Label: 'Column Sub Menu 2',
          },
        ],
      },
    ],
    ContextMenuItems: [
      {
        Label: 'Context Menu 1',
      },
      {
        Label: 'Context Menu 2',
      },
      {
        Label: 'Context Menu 3',
        SubMenuItems: [
          {
            Label: 'Column Sub Menu 1',
          },
          {
            Label: 'Open Column Chooser',
            UserMenuItemClickedFunction: () => {
              adaptableblotter.api.columnChooserApi.showColumnChooserPopup();
            },
            Icon: '<img src="./test.png"/>',
          },
        ],
      },
    ],
  },
};

function getContextMenuItems(params: any) {
  var result = [
    {
      // custom item
      name: 'Alert ' + params.value,
      action: function() {
        window.alert('Alerting about ' + params.value);
      },
      cssClasses: ['redFont', 'bold'],
    },
    {
      // custom item
      name: 'Always Disabled',
      disabled: true,
      tooltip: 'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
    },
    {
      name: 'Country',
      subMenu: [
        {
          name: 'Ireland',
          action: function() {
            console.log('Ireland was pressed');
          },
          icon: createFlagImg('ie'),
        },
        {
          name: 'UK',
          action: function() {
            console.log('UK was pressed');
          },
          icon: createFlagImg('gb'),
        },
        {
          name: 'France',
          action: function() {
            console.log('France was pressed');
          },
          icon: createFlagImg('fr'),
        },
      ],
    },
    {
      name: 'Person',
      subMenu: [
        {
          name: 'Niall',
          action: function() {
            console.log('Niall was pressed');
          },
          icon: createFlagImg('fr'),
        },
        {
          name: 'Sean',
          action: function() {
            console.log('Sean was pressed');
          },
        },
        {
          name: 'John',
          action: function() {
            console.log('John was pressed');
          },
        },
        {
          name: 'Alberto',
          action: function() {
            console.log('Alberto was pressed');
          },
        },
        {
          name: 'Tony',
          action: function() {
            console.log('Tony was pressed');
          },
        },
        {
          name: 'Andrew',
          action: function() {
            console.log('Andrew was pressed');
          },
        },
        {
          name: 'Kev',
          action: function() {
            console.log('Kev was pressed');
          },
        },
        {
          name: 'Will',
          action: function() {
            console.log('Will was pressed');
          },
        },
        {
          name: 'Armaan',
          action: function() {
            console.log('Armaan was pressed');
          },
        },
      ],
    }, // built in separator
    'separator',
    {
      // custom item
      name: 'Windows',
      shortcut: 'Alt + W',
      action: function() {
        console.log('Windows Item Selected');
      },
      icon: '<img src="../images/skills/windows.png"/>',
    },
    {
      // custom item
      name: 'Mac',
      shortcut: 'Alt + M',
      action: function() {
        console.log('Mac Item Selected');
      },
      icon: '<img src="../images/skills/mac.png"/>',
    }, // built in separator
    'separator',
    {
      // custom item
      name: 'Checked',
      checked: true,
      action: function() {
        console.log('Checked Selected');
      },
      icon: '<img src="../images/skills/mac.png"/>',
    }, // built in copy item
    'copy',
    'separator',
    'chartRange',
  ];

  return result;
}

function createFlagImg(flag: any) {
  return (
    '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
    flag +
    '.png"/>'
  );
}

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
