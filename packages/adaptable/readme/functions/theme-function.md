# Theme (AdaptableFunction)

The Theme([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Theme`) Function allows users to select between one of AdapTable's shipped Themes ('Light' and 'Dark') and for developers to create their own.

Users can change the Theme at run-time (subject to Entitlements) by selecting the theme they want from the Dropdown in the Theme Toolbar, Tool Panel or Popup.

### Custom Themes
AdapTable ships with 2 themes - "Light Theme" and "Dark Theme", but developers can easily add their own using CSS Variables.

> Make sure to include the name of the Custom Theme in the [Theme State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_themestate_.themestate.html) section of Predefined Config.

Full details of how to create a Custom Theme can be found in the [Theming and Styling Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-theming-guide.md).

## UI Elements
To Do

## Entitlements
Theme supports these Entitlement Rules:

- **Full**: The User can change the selected Theme

- **Hidden**: The User cannot change the selected Theme

- **ReadOnly**: N/A

## FAQ

**Can I create my own theme if I don't like either of the presets?**

Yes, you can create your own theme based on your own colour scheme. Everything is based on CSS Variables.

**If I change the theme, will that get saved?**

A. Yes, the last selected theme is saved in the user's settings and selected the next time AdapTable is loaded.

**Which System Themes do you ship?**

We ship with 2 themes: Light Theme and Dark Theme

**Why do you only provide 2 themes - there used to be more?**

We used to offer 15 themes but we found that, in practice, users were only using the white or dark theme or were creating their own. So to reduce the download footprint we now only offer 2 themes but make it easy for you to add as many other as you want.

**Can I make my theme update the Underlying Grid like the System Themes do?**

You will need to do that yourself .

**How do I upload my own theme?**

You can do that through configuration. 

The Themes section has a 'UserThemes' collection, each of which specifies a Name and Description. 

These themes will appear in the themes dropdown like the system themes and get resolved when they are selected. 

The Description is the value that will appear in the dropdown and the Name is the name of the css file that you have to provide.

### Further Information

- [Theme State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_themestate_.themestate.html)

- [Theme Api](https://api.adaptabletools.com/interfaces/_src_api_themeapi_.themeapi.html)

- [Dark Theme Demo](https://demo.adaptabletools.com/theme/aggriddarkthemedemo)

- [Custom Theme Demo](https://demo.adaptabletools.com/theme/aggridcustomthemedemo)

- [Theming and Styling Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-theming-guide.md)

