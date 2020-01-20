# AdapTable Theming and Styling Guide

A theme is essentially a collection of css variables that AdapTable exposes, and you can customise. 

You can have more css theme files imported in the app without them overriding each-other.

### System Themes

AdapTable ships with 2 themes: *light* (the default) and *dark*

If you wish to use the Dark Theme, specify *dark* as the Current Theme in the Theme section of Predefined Config. Make sure, if using ag-Grid, that you also import the associated vendor theme.

You do not need to provide a VendorGridClassName when using either of the System Themes as this is done for you.

This means that you only need provide themes for AdapTable and / or the Vendor Grid if you are unhappy with the defaults that we provide.

### Applying a Theme

When AdapTable applies a theme, it sets the `ab--theme-<THEME_NAME>` css className on the document HTML element - so only one theme will be applied at any given time. 

### Writing a Theme

In order to write a theme - let's call it `blue` - you have to define it with the following css:

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

You also need to make sure that the theme name is included in the UserThemes property in the Theme section of Predefined Config, together with a description (the text that appears in the Theme dropdown) and - optionally - the name of the vendor grid theme that you want to load simultaneously with the Theme.

 ```ts
  export default {
    Theme: {
      UserThemes:[
        {
          Name:"blue",
          Description:"Blue Theme",
          VendorGridClassName: 'ag-theme-blue'
        }
      ],
      CurrentTheme: 'blue'
    }  
  } as PredefinedConfig;
  ```

> **The theme name cannot contain whitespace characters - it needs to be a string which can be used as a css className**
  
### CSS Variables

AdapTable uses CSS Variables in order to allow you to build your own custom themes.

There are a huge number of css variables that are available. 

For easy identification purposes every CSS Variable starts with either '--ab-' or '--ab__'

This example shows the contents of the dark theme.

## Example Theme

```css
html.ab--theme-dark {
  /* this is here so we detect when the dark theme has been correctly loaded */
  --ab-theme-loaded: dark;

  /* the background for the whole Adaptable Dashboard - only used once */
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

In addition to the above variables, the following are also available

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
  --ab-font-size-4: 1rem;  /* 16px for 1rem=16px */
  --ab-font-size-5: 1.25rem;  /* 20px for 1rem=16px */
  --ab-font-size-6: 1.5rem;  /* 24px for 1rem=16px */
  --ab-font-size-7: 2.25rem;  /* 36px for 1rem=16px */

  /* use this to specify the font family you want for Adaptable*/
  --ab__font-family: inherit;
  
  /* customise the border radius for some of Adaptable elements */
  --ab__border-radius: var(--ab-space-1);
}
```

That's all the css you have to write for defining a theme - in fact, you can choose which of the above colors/variables to define - you don't have to define them all. 

Start incrementally, and work your way up as you need - use the dark theme as an example.


### Using with SASS

#### When using sass, in order to use sass variables as values for css properties, you have to use interpolation:

```scss
$theme-color: #fea7ff;

html.ab--theme-light {
  --ab-cmp-dashboardpanel_header__background: #{$theme-color}; /* use interpolation ! */
}
```

### Styling icons

Adaptable uses inline SVG for icons, since that's very performant and doesn't require any additional download.

However, you might want to style icons differently - in this case, you can customize that through css. Every icon has the `ab-Icon` css class, and also `ab-Icon--NAME` where `NAME` is the name of the icon. So for example, if you want to use a background image, you can do the following:


```css
.ab-Icon--build path {
  visibility: hidden; /* to hide the contents of the actual SVG */
}
.ab-Icon--build {
  background-image: url(...);
  background-size: cover;
}
```

## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptableblotter.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptableblotter.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
