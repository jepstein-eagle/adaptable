# Layout (AdaptableFunction)

The Layout Function facilities creating Layouts (a.k.a. Views) - essentially a way of managing columns designed to enable users easily to switch between different 'views' of their grid

Layouts typically contain column visibility and order information but can also include column sorting, grouping and pivoting information.

By default Layouts will save automatially when their contents change - and there must always be one active Layout in AdapTable.

### Layout Contents
Layouts are primarily sets of column visibility and order; they **do not include styling functions** (e.g. Conditional Styles) **nor do they include searching or filtering functions**.

However Layouts do include a number of important properties including:

* column visibility

* column order

* sorting info - multiple columns can be sorted

* columns widths

* pinned column details

* row grouping details

* aggregation info (e.g. which columns will display an aggregation number in a grouped row)

* pivoting information

### Creating Layouts
Layouts are created in 2 ways:

* visually in the Layout Editor which allows for the selection (and order) of visible columns, sorting, grouping, aggregrating and pivoting.

* defined in [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layoutstate.html) - with the ability to provide full sorting, grouping and pivoting details

> Creating a Layout in Predefined Config also allows you to set Pinning and Column Widths information - which cannot be done in the Layout Editor (as it is actioned in the Grid itself).

### Saving Layouts
By default layouts **save automatically** when any relevant changes are made in the grid.

To avoid this behaviour set the `autoSaveLayouts` property to **false** in [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html#autosavelayouts).  When this happens, a Save button will be visible in the Layout toolbar.

You can override the LayoutOptions property in each Layout by setting the `AutoSave` property.

### Auto-Sizing Layout Columns
AdapTable enables layout columns to be auto-sized by default - popular with users where horizontal space is at a premium.  

There are 2 properties available in [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html) (both of which default to *false*):

- `autoSizeColumnsInLayout` - whether all Layouts should automatically autosize columns when **first opened**  

- `autoSizeColumnsInPivotLayout` - whether pivot-based Layouts should automatically autosize columns when **first opened** 

### Default Layout
You must always have at least one Layout - which will automatically get updated as your grid changes.

> AdapTable will not allow you to default the last remaining Layout in your State.

If no Layouts are provided in Predefined Config, then AdapTable provides a **Default Layout** at start-up based on the inital column definitions provided to the grid.  

> There is an option in LayoutOptions to tell AdapTable to create a Default Layout even if you have defined other Layouts in Predefined Config.

### Persisting Expanded Grouped Rows
By default a Layout will not store information about which Grouped Rows are currently open so this information is lost when the application next loads.

To change this behaviour set the `includeExpandedRowGroups` property to **true** in [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html#includeexpandedrowgroups)

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

**Is there a limit on the number of Layouts allowed?**

No, you can create as many Layouts as you wish but you must always have at least one Layout.

AdapTable will prevent you from deleting the last Layout in your state.

**Can my colleague use the same Layout as me?**

Yes, if you have Team Sharing enabled, then you can upload your Layout so that your colleague can also access it.

**Does a Layout include which column(s) is currently sorted?**

Yes, this is included in the layout since version 1.6

**Does a Layout include pivoting?**

Yes if the underlying vendor grid supports pivoting.

**Can a Layout included multiple sorts?**

Yes. If the underlying grid supports multiple sorts, then the layout will as well.

**Does a Layout include information about column widths or pinning?**

Yes - this can be provided in the Config and it will be saved automatically as the Layout changes.  

**What is the "Default Layout"?**

This is a Layout that AdapTable will create on start-up based on the column definitions you provide - if you have not defined any Layouts in your Predefined Config.

**Is every Layout editable and deletable?**

Yes, assuming that your [Entitlements](../guides/adaptable-entitlements-guide.md) allow you to edit / delete predefined Adaptable Objects.

The only time a Layout cannot be deleted is if it's the last one in the State (as you must always have at least one Layout).

**What happeend to the old Column Chooser?**

Layouts received a big makeover in Version 7 of AdapTable including a much improved Layout Editor which removed the need for a separate Column Chooser screen.

### Further Information
- [Layout State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.layoutstate.html)

- [Layout Api](https://api.adaptabletools.com/interfaces/_src_api_layoutapi_.layoutapi.html)

- [Layout Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_layoutoptions_.layoutoptions.html)

- [Layout Demos](https://demo.adaptabletools.com/layout)
