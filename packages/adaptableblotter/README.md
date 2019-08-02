# adaptableblotter

Repository for the Core Adaptable Blotter HTML5 version - AdaptableBlotter.JS - developed by Adaptable Tools.

AdaptableBlotter.JS is a powerful DataGrid add-on that integrates with the leading datagrid components and provides all the additional, rich functionality that financial and other advanced users expect from their grids and blotters.

It offers - out of the box - incredibly powerful searching, filtering, sorting, styling and editing functionality. It also provides unparalleled validation and audit functions, vital in the current regulatory and compliance environment. Try it out for yourself at https://demo.adaptableblotter.com.

Grid components supported include:

- ag-Grid by ag-Grid
- Hypergrid by OpenFin
- Kendo Grid by Telerik
- Adaptable Grid by Adaptable Tools.

More grid components are being added all the time so contact us if you would like us to implement your favourite HTML5 grid control.

AdaptableBlotter.JS is fully data agnostic and can work with any data set you provide it with. It is suitable for all data, all asset classes, all grid types, all locations and all use cases.

There are additional React and Angular wrappers - please see the relevant packages.

## Installation

To install Adaptable Blotter via npm, run:

```javascript
npm install adaptableblotter
```


## Styling

In order for the AdaptableBlotter to look right, you have to import the index.css file

```tsx
import "adaptableblotter/index.css"
```

This contains the structural styles and the light theme.

For the dark theme, you also have to import

```tsx
import "adaptableblotter/themes/dark.css"
```

So if you want the dark theme in your app, you have to do

```tsx
import "adaptableblotter/index.css"
import "adaptableblotter/themes/dark.css"
```

This makes both the `light` and the `dark` themes available. You can also write your own custom theme for the AdaptableBlotter - see the section below for this.

A theme is basically a collection of css variables that the AdaptableBlotter exposes, and you can customize. You can have more css theme files imported in the app without them overriding each-other.

When the AdaptableBlotter applies a theme, it sets the `ab--theme-<THEME_NAME>` css className on the document HTML element - so only one theme will be applied at any given time.

### Writing a theme

In order to write a theme, let's call it `blue`, you have to define it with the following css:

```css
html.ab--theme-blue {
  --ab-theme-loaded: dark;
}
```

so basically 

```css
html.ab--theme-<THEME_NAME> {
  --ab-theme-loaded: <THEME_NAME>;
}
```

There are a number of css variables that are available for customizing a theme - see below (it's the contents of the dark theme)

```css
html.ab--theme-dark {
  /* this is here so we detect when the dark theme has been correctly loaded */
  --ab-theme-loaded: dark;

  /* the background for the whole AdaptableBlotter Dashboard - only used once */
  --ab-dashboard__background: #232323;   
  --ab-cmp-input--disabled__background:#b6b7b8;
  
  /* default background color to be used in dialogs, panels, inputs, etc */
  --ab-color-defaultbackground: #3e444c;
  /* color for text displayed on the default background */
  --ab-color-text-on-defaultbackground: #f7f7f7;

  /* the most used color - used for example, in dashboard toolbars + a light and dark variation */
  --ab-color-primary: #262d2f;
  --ab-color-primarylight: #2d3537;
  --ab-color-primarydark: #1c2021;
  /* color for text displayed over the primary color */
  --ab-color-text-on-primary: #f7f7f7;

  /* a color not so often used - mostly used for making things stand out - used for example, in wizard dialog headers + a light and dark variation */
  --ab-color-secondary: #f7f7f7;
  --ab-color-secondarylight: #07456d;
  --ab-color-secondarydark: #f7f7f7;
  /* color for text displayed over the secondary color */
  --ab-color-text-on-secondary: #262d2f;
  --ab-color-text-on-secondarylight: #f7f7f7;
}
```

In adition to the above variables, the following are also available

```css
html.ab--theme-my-theme {
  --ab-theme-loaded: my-theme;

  /* we define a set of spacings, which you can customize to suit your needs */
  --ab-space-0: 0px;
  --ab-space-1: 4px;
  --ab-space-2: 8px;
  --ab-space-3: 16px;
  --ab-space-4: 32px;
  --ab-space-5: 64px;
  --ab-space-6: 128px;
  --ab-space-7: 256px;

  /* also a set of font sizes */
  --ab-font-size-0: 0.5rem; /* 8px for 1rem=16px */
  --ab-font-size-1: 0.625rem; /* 10px for 1rem=16px */
  --ab-font-size-2: 0.75rem; /* 12px for 1rem=16px */
  --ab-font-size-3: 0.875rem; /* 14px for 1rem=16px */
  --ab-font-size-4: 1rem; 

  /* use this to specify the font family you want for the blotter */
  --ab__font-family: inherit;
  
  /* customize the border radius for some of the AdaptableBlotter elements */
  --ab__border-radius: var(--ab-space-1);
}
```

That's all the css you have to write for defining a theme - in fact, you can choose which of the above colors/variables to define - you don't have to define them all. Start incrementally, and work your way up as you need - use the dark theme as an example.

## Licences

The Adaptable Blotter is a commercial product and requires a purchased licence for use.
There are 3 licence types available (all sold on an annual basis):

    * *Community* - free for charities, students in full time education and open-source projects.  Offers full range of functionality but state cannot be saved.
    * *Standard* - full functionality of the Adaptable Blotter other than Enteprise modules like Charting (which can be created by not saved).
    * *Enterprise* - full access to all functionality and modules in the Adaptable Blotter.

The Adaptable Blotter licence covers both AdaptableBlotter.NET and AdaptableBlotter.JS versions, and offers regular updates and full support.

It is free to use the Evaluation for an evaulation (a Community licence will be given).

Licences are sold to end-users typically in 'bands' so the price per user falls as volumne increases. There is also a Universal option which gives unlimited usage to unlimited users.

Note: The Adaptable Blotter licence does not include the licence for the underlying grid - if you use a vendor grid that requires a commerical licence, you must purchase that separately.

Please contact the Adaptable Tools Sales Team at sales@adaptabletools.com for more information.

## Usage

```js
import AdaptableBlotter from 'adaptableblotter/agGrid';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import 'adaptableblotter/base.css';
import 'adaptableblotter/themes/light.css';
```

## Demo

To see AdaptableBlotter.JS in action visit https://demo.adaptableblotter.com where you can see the Adaptable Blotter running againt a number of different dummy data sets using various underlying DataGrids.

## Help

Further information about AdaptableBlotter.JS is available at www.adaptabletools.com. And there is detailed Help at https://adaptabletools.zendesk.com/hc/en-us.

Developers can see how to access the Adaptable Blotter programmatically at https://api.adaptableblotter.com

For all enquiries please email the Adaptable Tools Support Team at support@adaptabletools.com.

[![Build Status](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter.svg?branch=master)](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter)
