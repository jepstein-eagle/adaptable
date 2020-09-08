# Layout (AdaptableFunction)

The Layout Function facilities creating Layouts (a.k.a. Views) - **sets of column visibility and order** designed to enable users easily to switch between different 'views' of their grid

Layouts can also include column sorting, grouping and pivoting information and can save automatially when changed.


### Layout Contents
Layouts are primarily sets of column visibility and order; they **do not include styling functions** (e.g. Conditional Styles) **nor do they include searching or filtering functions**.

However Layouts can, optionally, also include column sorting, grouping and pivoting information in their definitions which will be included in the [Layout](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layout.html).


### Creating Layouts
Layouts are created through the Layout Editor which allows for the selection (and order) of visible columns, sorting, grouping, aggregrating and pivoting.

Alternatively Layouts can be defined in [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layoutstate.html) - with the ability to provide full sorting, grouping and pivoting details


### Saving and Restoring Layouts
By default layouts **save automatically** when changes are made in the grid

To avoid this behaviour set the property `autoSaveLayouts` to **false** in [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html#autosavelayouts).  When this happens, a Save button will be visible in the Layout toolbar.

You can override the LayoutOptions property in each Layout by setting the `AutoSave` property.

### Auto-Sizing Layout Columns
AdapTable enables layout columns to be auto-sized by default - popular with users where horizontal space is at a premium.  

There are 2 properties available in [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html):

- `autoSizeColumnsInLayout` - whether all Layouts should automatically autosize columns when **first opened** (*Default: false*) 

- `autoSizeColumnsInPivotLayout` - whether a pivot-based Layout should automatically autosize columns when **first opened** (*Default: false*)

### Default Layout
You must always have at least one Layout - which will automatically get updated as your grid changes.

If no Layouts are provided in Predefined Config, then AdapTable provides a 'Default Layout' at start-up based on the inital column definitions provided to the grid.  

> There is an option in LayoutOptions to tell AdapTable to create a Default Layout even if you have defined other Layouts in Predefined Config.


## UI Elements
Layout includes the following UI Elements:

- **Popup** - Shows a list of existing Layoutes with *Edit* and *Delete* buttons, and a 'Current' Radio Button to select one to be set.  Also includes an *Add* button to start the Layout Wizard.

- **Editor** - A single screen which enables the creation and editing of Layouts.

- **Toolbar** - Provides a list of the available Layoute in a dropdown, together with buttons for adding / restoring / deleting.

- **Tool Panel** - Same as Toolbar above.

## Entitlements
Layout supports these Entitlement Rules:

- **Full**: All Layouts are available to the User

- **Hidden**: All Layouts are  hidden from the User

- **ReadOnly**: User can select Layouts that have been provided in Predefined Config but cannot edit or delete them, nor add others.

## FAQ

**Is there a limit on the number of layouts allowed?**

No, you can create as many layouts as you wish but you must always have at least one Layout.

AdapTable will prevent you from deleting the last Layout in your state.

**Can my colleague use the same layout as me?**

Yes, if you have team sharing enabled then you can upload your layout so that your colleague can also access it.

**Does a layout include which column(s) is currently sorted?**

Yes, this is included in the layout since version 1.6

**Does a layout include pivoting?**

Yes if the underlying vendor grid supports pivoting.

**Can a layout included multiple sorts?**

Yes. If the underlying grid supports multiple sorts, then the layout will as well.

**Does a layout include information about column widths or pinning?**

Yes - this can be provided in the Config and it will be saved automatically as the Layout changes.  

**What is the "Default Layout"?**

This is a Layout that we create on start-up based on the column definitions you provide AdapTable at start-up if you have not defined any Layouts in your Predefined Config.

**Is every layout editable and deletable?**

Yes, assuming that your [Entitlements](../guides/adaptable-entitlements-guide.md) allow you to edit / delete predefined Adaptable Objects.

### Further Information
- [Layout State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layoutstate.html)

- [Layout Api](https://api.adaptabletools.com/interfaces/_src_api_layoutapi_.layoutapi.html)

- [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html)

- [Layout Demos](https://demo.adaptabletools.com/layout)

