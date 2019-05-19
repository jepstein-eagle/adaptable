# Adaptable Blotter React ag-Grid

Repository for the Adaptable Blotter React ag-Grid Wrapper.

This allows you to install, instantiate and reference the Adaptable Blotter using ag-Grid in a "React-friendly" manner.

## Installation

To install Adaptable Blotter React ag-Grid via npm, run:

```javascript
npm install adaptableblotter-react-aggrid
```

## Usage

```jsx

import AdaptableBlotterReact from 'adaptableblotter-react-aggrid';

import 'adaptableblotter-react-aggrid/base.css';
import 'adaptableblotter-react-aggrid/themes/light.css'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const adaptableBlotterOptions: IAdaptableBlotterOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  blotterId: 'react demo',
};

export default () => <AdaptableBlotterReact
  style={{ height: '100vh' }}
  gridOptions={ ... }
  blotterOptions={adaptableBlotterOptions}
/>


```

### Props

#### Mandatory:

- gridOptions: ag-Grid GridOptions object
- blotterOptions: IAdaptableBlotterOptions object

#### Optional

- render|children: ({ grid, blotter}) => ReactNode - can specify a custom render function that is called with the rendered grid and blotter, and can be used to change the layout of the component, and render additional elements or change blotter/grid order
- onReady(blotter) - function prop called after the blotter is instantiated and ready to use
- onThemeChanged: (blotter, arg: IThemeChangedEventArgs)
- onSearchChanged: (blotter, arg: ISearchChangedEventArgs)
- onColumnStateChanged: (blotter, arg: IColumnStateChangedEventArgs)
- onAlertFired: (blotter, arg: IAlertFiredEventArgs)

## Licences

The Adaptable Blotter is a commercial product and requires a purchased licence for use.
There are 3 licence types available (all sold on an annual basis):

- _Community_ - free for charities, students in full time education and open-source projects. Offers full range of functionality but state cannot be saved.
- _Standard_ - offers full functionality of the Adaptable Blotter but state for Enteprise modules like Charting cannot be saved.
- _Enterprise_ - provides full access to all functionality and modules in the Adaptable Blotter and all state is saved.

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
