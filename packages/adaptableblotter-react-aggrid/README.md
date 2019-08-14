# Adaptable Blotter React ag-Grid

Repository for the Adaptable Blotter React ag-Grid Wrapper.

This allows you to install, instantiate and reference the Adaptable Blotter using ag-Grid in a "React-friendly" manner.

## Installation

The React wrapper of the Adaptable Blotter is distributed via a private NPM registry - `https://registry.adaptabletools.com`, so getting it installed requires the following steps:

1. get a commercial license - you can email [`support@adaptabletools.com`](mailto:support@adaptabletools.com), so we'll provide you with a username.

2. point your npm client to the correct registry for packages under the `@adaptabletools` scope

```npm config set @adaptabletools:registry https://registry.adaptabletools.com```

if you're using yarn

```yarn config set @adaptabletools:registry https://registry.adaptabletools.com```


3. login with your username for the `@adaptabletools` scope, on the private registry

```npm login --registry=https://registry.adaptabletools.com --scope=@adaptabletools```

4. check you are logged-in correctly via

```npm whoami --registry=https://registry.adaptabletools.com```

it should display the username you received from use as the current login on the private registry. NOTE: this does not affect your username/login session on the public npm registry.

5. install the React wrapper of the Adaptable Blotter

```npm i @adaptabletools/adaptableblotter-react-aggrid```


## Styling

In order for the AdaptableBlotter to look right, you have to import the index.css file

```tsx
import "@adaptabletools/adaptableblotter-react-aggrid/index.css"
```

This contains the structural styles and the (default) light theme.

For the dark theme, you also have to import

```tsx
import "@adaptabletools/adaptableblotter-react-aggrid/themes/dark.css"
```

So if you want the dark theme in your app, you have to do

```tsx
import "@adaptabletools/adaptableblotter-react-aggrid/index.css"
import "@adaptabletools/adaptableblotter-react-aggrid/themes/dark.css"
```

This makes both the `light` and the `dark` themes available. You can also write your own custom theme for the AdaptableBlotter - see the section below for this.

A theme is basically a collection of css variables that the AdaptableBlotter exposes, and you can customise. You can have more css theme files imported in the app without them overriding each-other.

When the AdaptableBlotter applies a theme, it sets the `ab--theme-<THEME_NAME>` css className on the document HTML element - so only one theme will be applied at any given time.

### Writing a theme

In order to write a theme, let's call it `blue`, you have to define it with the following css:

```css
html.ab--theme-blue {
  --ab-theme-loaded: blue;
}
```

so basically 

```css
html.ab--theme-<THEME_NAME> {
  --ab-theme-loaded: <THEME_NAME>;
}
```

There are a number of css variables that are available for customising a theme - see below (it's the contents of the dark theme)

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

  /* we define a set of spacings, which you can customise to suit your needs */
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
  
  /* customise the border radius for some of the AdaptableBlotter elements */
  --ab__border-radius: var(--ab-space-1);
}
```

That's all the css you have to write for defining a theme - in fact, you can choose which of the above colors/variables to define - you don't have to define them all. Start incrementally, and work your way up as you need - use the dark theme as an example.


## Usage

```jsx

import AdaptableBlotterReact from '@adaptabletools/adaptableblotter-react-aggrid';

import '@adaptabletools/adaptableblotter-react-aggrid/index.css'; // this also includes the light theme
import '@adaptabletools/adaptableblotter-react-aggrid/themes/dark.css'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const adaptableBlotterOptions: AdaptableBlotterOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  blotterId: 'react demo',
};

export default () => <AdaptableBlotterReact
  style={{ height: '100vh' }}
  gridOptions={ ... }
  blotterOptions={adaptableBlotterOptions}
  onBlotterReady={(blotterApi) => { ... }}
/>


```

### Props

#### Mandatory:

- gridOptions: ag-Grid GridOptions object
- blotterOptions: AdaptableBlotterOptions object

#### Optional

- onBlotterReady: (blotterApi: IBlotterApi) - gives you access to the blotter api object
- render|children: ({ grid, blotter}) => ReactNode - can specify a custom render function that is called with the rendered grid and blotter, and can be used to change the layout of the component, and render additional elements or change blotter/grid order
- onThemeChanged: (blotter, arg: ThemeChangedEventArgs)
- onSearchChanged: (blotter, arg: SearchChangedEventArgs)
- onColumnStateChanged: (blotter, arg: ColumnStateChangedEventArgs)
- onAlertFired: (blotter, arg: AlertFiredEventArgs)
- onActionColumnClicked: (blotter, arg: ActionColumnClickedEventArgs)
- onSelectionChanged: (blotter, arg: SelectionChangedEventArgs)

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
