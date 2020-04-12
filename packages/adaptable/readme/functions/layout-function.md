# Layout (AdaptableFunction)

The Layout([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Layout`) Function facilities creating Layouts (a.k.a. Views) - **sets of column visibility and order** designed to enable users easily to switch between different 'views' of their grid

Layouts can also include column sorting, grouping and pivoting information and can save automatially when changed.


### Layout Contents
Layouts are primarily sets of column visibility and order; they **do not include styling functions** (e.g. Conditional Styles) **nor do they include searching or filtering functions**.

However Layouts can, optionally, also include column sorting, grouping and pivoting information in their definitions which will be included in the [Layout](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layout.html).

#### Vendor Grid Info
Layouts can also include underlying information about the Grid which will be automatically re-applied when the Layout loads.  

This is done by setting the  `includeVendorStateInLayouts` property to true in [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html#includevendorstateinlayouts)

> Vendor Layout Information is not available for all underlying grids.


### Creating Layouts
When creating a Layout in the UI, the Layout Wizard provides 2 choices:

- building the Layout from scratch (selecting bespoke column visibility, order and sorting)

- copying the currently selected Layout - this will include the Layout's current column visilbity and order but not any vendor information (e.g. column widths, grouping, pinned rows etc.)

Alternatively Layouts can be defined in [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layoutstate.html) - with the ability to provide full sorting, grouping and pivoting details

> If providing a [Layout](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layout.html) in Predefined Config, make sure **not to populate** the `AdaptableGridInfo` and `VendorGridInfo` properties as these are for internal use only.


### Saving and Restoring Layouts
There is an option to have layouts save automatically when changes are made in the grid - ensure that the property `autoSaveLayouts` is set to true in [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html#autosavelayouts).

> At present there is not an 'Auto-Save' option per Layout; it applies for **all Layouts**.

If the `autoSaveLayouts` property is set to false, then a Save button will be available in the toolbar.

Layout Toolbar and ToolPanel also include a *Restore* button which allows Users to revert the Layout back to its initial definition.

### Auto-Sizing Layout Columns
AdapTable enables layout columns to be auto-sized by default - this is very popular with users where horizontal space is at a premium.  There are 3 options:

- `autoSizeColumnsInLayout` - whether all Layouts should automatically autosize columns when **first opened** (*Default: false*) 

- `autoSizeColumnsInDefaultLayout` - whether the Default Layout should automatically autosize columns (*Default: true*)

- `autoSizeColumnsInPivotLayout` - whether a pivot-based Layout should automatically autosize columns when **first opened** (*Default: false*)

### Default Layout
AdapTable provides a 'Default Layout' at start-up based on the inital column definitions provided to the grid.  

Whenever a Layout is unselected or cleared, AdapTable will revert to displaying the Default Layout.

**Note: the Default Layout is never updated or saved at runtime**.  This means that any changes made to Column sorting, visibilty or order will not be persisted; users who wish to persist column changes must create a bespoke Layout.

> Do not create a Layout called 'Default Layout' or 'AB_Default_Layout' as these are used internally to refer to the Default Layout and can cause problems.


## UI Elements
Layout includes the following UI Elements:

- **Popup** - Shows a list of existing Layoutes with *Edit* and *Delete* buttons, and a 'Current' Radio Button to select one to be set.  Also includes an *Add* button to start the Layout Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Layouts.

- **Toolbar** - Provides a list of the available Layoute in a dropdown, together with buttons for adding / restoring / deleting.

- **Tool Panel** - Same as Toolbar above.

## Entitlements
Layout supports these Entitlement Rules:

- **Full**: All Layouts are available to the User

- **Hidden**: All Layouts are  hidden from the User

- **ReadOnly**: User can select Layouts that have been provided in Predefined Config but cannot edit or delete them, nor add others.

## FAQ

**Is there a limit on the number of layouts allowed?**

No, you can create as many layouts as you wish.

**Can my colleague use the same layout as me?**

Yes, if you have team sharing enabled then you can upload your layout so that your colleague can also access it.

**Does a layout include which column(s) is currently sorted?**

Yes, this is included in the layout since version 1.6

**Does a layout include pivoting?**

Yes if the underlying vendor grid supports pivoting.

**Can a layout included multiple sorts?**

Yes. If the underlying grid supports multiple sorts, then the layout will as well.

**Does a layout include information about column widths or pinning?**

Yes - if the `includeVendorStateInLayouts` property is set to true in LayoutOptions in AdaptableOptions.  

**Can I copy what is currently in my grid as a layout?**

Yes, in version 1.10 there is an option to copy the current grid setup as your new layout. You can then subsequently make changes to either the new or the original layout without affecting the other.

**What is the "Default Layout"?**

This is a Layout that we create on start-up based on the column definitions you provide AdapTable at start-up. Unlike other Layouts, the Default Layout is not editable or saveable.

**Is every layout editable and deletable?**

Yes, other than the Default Layout (assuming that your [Entitlements](./guides/adaptable-entitlements-guide.md) allow you to edit / delete predefined Adaptable Objects).

### Further Information
- [Layout State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layoutstate.html)

- [Layout Api](https://api.adaptabletools.com/interfaces/_src_api_layoutapi_.layoutapi.html)

- [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html)

- [Layout Demos](https://demo.adaptabletools.com/layout)

