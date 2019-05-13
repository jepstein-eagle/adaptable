# Adaptable Blotter React

Repository for the Adaptable Blotter React Wrapper.

This allows you to install, instantiate and reference the Adaptable Blotter in a "React-friendly" manner.

## Installation

To install Adaptable Blotter React via npm, run:

```javascript
npm install adaptableblotter-react
```

## Usage

```jsx

import AdaptableBlotterReact from 'adaptableblotter-react';

import 'adaptableblotter/base.css'
import 'adaptableblotter/themes/light.css'
import 'adaptableblotter-react/base.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const adaptableBlotterOptions: IAdaptableBlotterOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  blotterId: 'basic demo',
  licenceKey: process.env.ENTERPRISE_LICENSE
};

export default () => <AdaptableBlotterReact
  style={{ height: '100vh' }}
  gridOptions={ ... }
  blotterOptions={adaptableBlotterOptions}
/>


```

### Props

#### Mandatory:

- gridOptions: AgGrid GridOptions object
- blotterOptions: IAdaptableBlotterOptions object

#### Optional

- renderGrid: (gridOptions: AgGrid GridOptions) => AgGridReact - can specify a custom render function for AgGridReact
- render|children: ({ grid, blotter}) => ReactNode - can specify a custom render function that is called with the rendered grid and blotter, and can be used to change the layout of the component, and render additional elements or change blotter/grid order
- agGridTheme: string - defaults to 'balham'. Can be used to give the AgGridReact wrapper element a corresponding theme className
- onThemeChanged: (blotter, IThemeChangedEventArgs)
- onSearchChanged: (blotter, ISearchChangedEventArgs)
- onStateChanged: (blotter, IStateChangedEventArgs)
- onColumnStateChanged: (blotter, IColumnStateChangedEventArgs)
- onAlertFired: (blotter, IAlertFiredEventArgs)

## Licences

The Adaptable Blotter is a commercial product and requires a purchased licence for use.
There are 3 licence types available (all sold on an annual basis):

- _Community_ - free for charities, students in full time education and open-source projects. Offers full range of functionality but state cannot be saved.
- _Standard_ - full functionality of the Adaptable Blotter other than Enteprise modules like Charting (which can be created by not saved).
- _Enterprise_ - full access to all functionality and modules in the Adaptable Blotter.

The Adaptable Blotter licence covers both AdaptableBlotter.NET and AdaptableBlotter.JS versions, and offers regular updates and full support.

It is free to use the Evaluation for an evaulation (a Community licence will be given).

Licences are sold to end-users (they are free for developers), typically in 'bands' so the price per user falls as volumne increases. There is also a Universal option which gives unlimited usage to unlimited users.

Note: The Adaptable Blotter licence does not include the licence for the underlying grid - if you use a vendor grid that requires a commerical licence, you must purchase that separately.

Please contact the Adaptable Tools Sales Team at sales@adaptabletools.com for more information.

## Demo

To see AdaptableBlotter.JS in action visit https://demo.adaptableblotter.com where you can see the Adaptable Blotter running againt a number of different dummy data sets using various underlying DataGrids.

## Help

Further information about AdaptableBlotter.JS is available at www.adaptabletools.com. And there is detailed Help at https://adaptabletools.zendesk.com/hc/en-us.

For all enquiries please email the Adaptable Tools Support Team at support@adaptabletools.com.

[![Build Status](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter.svg?branch=master)](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter)
