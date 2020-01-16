# AdapTable Theming and Styling Guide



A theme is basically a collection of css variables that AdapTable exposes, and you can customise. You can have more css theme files imported in the app without them overriding each-other.

System Themes
to go here - light and dark
Note
The default Theme for AdapTable is Light Theme.

If you wish to use the Dark Theme, specify 'dark' as the Current Theme in the Theme section of Predefined Config. Make sure, if using ag-Grid, that you also import the associated vendor theme.
AdapTable allows you to choose from one of two shipped themes (Light Theme and Dark Theme), or to create your own themes.

You do not need to provide a VendorGridClassName when using either of the System Themes as this is done for you, using the following defaults:

ag-Grid -  Light Theme: balham,   Dark Theme: balham-dark

Hypergrid - a Light Theme (blue and white alternating rows) and a Dark Theme (black and grey alternating rows) provided by us.

In order to ensure that the vendor grid will update in line with the System Theme, make sure that the useDefaultVendorGridThemes property is set to true in Adaptable Options.


The default system theme is Light Theme so, at startup, your underlying vendor grid will automatically pick up the light theme associated with it (if useDefaultVendorGridThemes is set to true).  

This means that you only need provide themes for AdapTable and / or the Vendor Grid if you are unhappy with the defaults that we provide.

Link to Theme State



When AdapTable applies a theme, it sets the `ab--theme-<THEME_NAME>` css className on the document HTML element - so only one theme will be applied at any given time. 

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

and you also need to make sure that the theme name is included in the UserThemes property in the Theme section of Predefined Config (together with a description and - optionally - the name of the vendor grid theme that you want to load simultaneously with the Theme.):

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
  
  Note
As well as providing a theme name, you provide a Description (the text that appears in the Theme dropdown) and, optionally, which Vendor Grid theme should be applied when the Theme is selected.

There are a number of css variables that are available for customizing a theme - see below (it's the contents of the dark theme)

```css
/** 
 * This is the whole source for the dark theme - it's all there is to it!
 */ 
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
  --ab-font-size-4: 1rem; 

  /* use this to specify the font family you want for Adaptable*/
  --ab__font-family: inherit;
  
  /* customise the border radius for some of Adaptable elements */
  --ab__border-radius: var(--ab-space-1);
}
```

That's all the css you have to write for defining a theme - in fact, you can choose which of the above colors/variables to define - you don't have to define them all. Start incrementally, and work your way up as you need - use the dark theme as an example.


### Using with SASS

#### When using sass, in order to use sass variables as values for css properties, you have to use interpolation!!!

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
