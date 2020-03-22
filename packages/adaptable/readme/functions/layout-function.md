# Layout (AdaptableFunction)

The Layout([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Layout`) Function facilities creating Layouts (a.k.a. Views) - sets of column visibility and order. Layouts can also include column sorting, grouping and pivoting information and can save automatially when changed.


## UI Elements
To Do

## Entitlements
To Do

## FAQ

Is there a limit on the number of layouts allowed?

No, you can create as many layouts as you wish.

Can my colleague use the same layout as me?

Yes, if you have team sharing enabled then you can upload your layout so that your colleague can also access it.

Does a layout include which column(s) is currently sorted?

Yes, this is included in the layout since version 1.6

Does a layout include pivoting?

Yes if the underlying vendor grid supports pivoting.

Can a layout included multiple sorts?

Yes. If the underlying grid supports multiple sorts, then the layout will as well.

Does a layout include information about column widths or pinning?

Yes - if the includeVendorStateInLayouts property is set to true in LayoutOptions in AdaptableOptions.  

Note
This option is only currently available for ag-Grid.

Can a layout include vendor specific information - e.g. some ag-Grid properties?

A. No. We provide this functionality in the Adaptable Blotter.NET product so it is possible to do but we haven't yet introduced it to AdaptableBlotter.JS. We plan to do so shortly.

Can I copy what is currently in my grid as a layout?

A. Yes, in version 1.10 there is an option to copy the current grid setup as your new layout. You can then subsequently make changes to either the new or the original layout without affecting the other.

What is the "Default Layout"?

This is a Layout that we create on start-up based on the column definitions you provide AdapTable at start-up. Unlike other Layouts, the Default Layout is not editable or saveable.

Warning
Do not create a Layout called Default Layout or AB_Default_Layout as these are used to map your start-up column configuration and can cause problems.

Is every layout editable and deletable?

A. Yes, other than the Default Layout (assuming that your permissions allow you to edit / delete predefined Adaptable Objects).

### Further Information

To Do

