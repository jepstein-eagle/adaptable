# Layout (AdaptableFunction)

The Layout([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Layout`) Function facilities creating Layouts (a.k.a. Views) - sets of column visibility and order. 

Layouts can also include column sorting, grouping and pivoting information and can save automatially when changed.

>> Note: Layouts are just sets of column visibility and order; they **do not include styling functions** (e.g. Conditional Styles) **nor do they include searching or filtering functions**.

Layouts allow you easily to switch between different 'views' of your grid, which are named and saved for easy access. Each layout contains a set of column visibility, order, sort information and Vendor Layout Information (e.g. column groups, column widths).

> Vendor Layout Information is not available for all underlying grids.

To activate this feature, set the `includeVendorStateInLayouts` property to true.

When creating a Layout, the wizard will give you a choice between building it from scratch (selecting your own column visibility, order and sorting) or duplicating what is currently in the grid.

> There is an option to have layouts save automatically when changes are made in the grid - ensure that the property `autoSaveLayouts` is set to true.

Note: Do not create a Layout called Default Layout or AB_Default_Layout as these are used to map your start-up column configuration and can cause problems.

The Default Layout will not auto-save; if you want your Layout to update on changes, then you must create a new Layout.



## UI Elements
To Do

## Entitlements
To Do

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

**Can a layout include vendor specific information - e.g. some ag-Grid properties?**

No. We provide this functionality in the Adaptable Blotter.NET product so it is possible to do but we haven't yet introduced it to AdaptableBlotter.JS. We plan to do so shortly.

**Can I copy what is currently in my grid as a layout?**

Yes, in version 1.10 there is an option to copy the current grid setup as your new layout. You can then subsequently make changes to either the new or the original layout without affecting the other.

**What is the "Default Layout"?**

This is a Layout that we create on start-up based on the column definitions you provide AdapTable at start-up. Unlike other Layouts, the Default Layout is not editable or saveable.

> Do not create a Layout called Default Layout or AB_Default_Layout as these are used to map your start-up column configuration and can cause problems.

**Is every layout editable and deletable?**

Yes, other than the Default Layout (assuming that your permissions allow you to edit / delete predefined Adaptable Objects).

### Further Information

To Do

