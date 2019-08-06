# Adaptable Blotter Angular ag-Grid

Repository for the Adaptable Blotter Angular ag-Grid Wrapper.

This allows you to install, instantiate and reference the Adaptable Blotter using ag-Grid in an "Angular-friendly" manner.

The AdaptableBlotter angular package wraps the ag-Grid angular wrapper - so you can use all the goodies of angular custom rendering wherever the ag-Grid angular wrapper supports them.

## Installation

To install Adaptable Blotter React ag-Grid via npm, run:

```javascript
npm install adaptableblotter-angular-aggrid
```

## Usage

In your app module, import the AdaptableBlotterAngularAgGridModule module

```
import { AdaptableBlotterAngularAgGridModule } from 'adaptableblotter-angular-aggrid';
```

After that, you can use the blotter component in your app

```html
<adaptableblotter-angular-aggrid
  style="height: 100vh"
  [blotterOptions]="..."
  [gridOptions]="..."
  [onBlotterReady]="..."
>
</adaptableblotter-angular-aggrid>
```

### Styling

Don't forget to import the styles in your app: `@import '~adaptableblotter-angular-aggrid/index.css'`

The `index.css` file contains both the structural styles, as well as the default light theme:

- `adaptableblotter-angular-aggrid/base.css`
- `adaptableblotter-angular-aggrid/themes/light.css`

If you want, you can import those two files above separately. You can also import the dark theme as well.

So, for both the structural styles and the light and dark themes, you can import the following:

```
@import '~adaptableblotter-angular-aggrid/base.css';
@import '~adaptableblotter-angular-aggrid/themes/light.css';
@import '~adaptableblotter-angular-aggrid/themes/dark.css';
```

## Inputs

#### Mandatory:

- gridOptions: ag-Grid GridOptions object
- blotterOptions: AdaptableBlotterOptions object

#### Optional

- onBlotterReady: (blotterApi: IBlotterApi) - gives you access to the blotter api object

## Licences

The Adaptable Blotter is a commercial product and requires a purchased licence for use.

The Adaptable Blotter licence covers both AdaptableBlotter.NET and AdaptableBlotter.JS versions, and offers regular updates and full support.

If you wish to evaluate the Adaptable Blotter before purchase, please contact us requesting a Trial Licence.

Licences are sold to end-users typically in 'bands' so the price per user falls as volumne increases. There is also a Universal option which gives unlimited usage to unlimited users.

Note: The Adaptable Blotter licence does not include the licence for the underlying grid - if you use a vendor grid that requires a commerical licence, you must purchase that separately.

Please contact the Adaptable Tools Sales Team at sales@adaptabletools.com for more information.

## Demo

To see AdaptableBlotter.JS in action visit https://demo.adaptableblotter.com where you can see the Adaptable Blotter running againt a number of different dummy data sets using various underlying DataGrids.

## Help

Further information about AdaptableBlotter.JS is available at www.adaptabletools.com. And there is detailed Help at https://adaptabletools.zendesk.com/hc/en-us.

Developers can see how to access the Adaptable Blotter programmatically at https://api.adaptableblotter.com

For all enquiries please email the Adaptable Tools Support Team at support@adaptabletools.com.

[![Build Status](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter.svg?branch=master)](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter)
