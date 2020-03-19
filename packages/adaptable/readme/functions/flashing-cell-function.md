# Flashing Cell (AdaptableFunction)

The Flashing Cell([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `FlashingCell`) Function enables you to set numeric cells to flash briefly as their contents change.

You can set numeric cells to briefly change colour when their values change. This flashing effect is a useful visual aid.

By default, flashing cells is disabled. If you want to enable flashing cells on every column, tick the All Columns checkbox. If you only want flashing cells to be enabled on some columns, tick the Live checkbox for the columns you want to flash.

For each column that you want flashing cells enabled, you can set the Flash Duration, Up Colour and Down Colour properties as appropriate.

Note
The colour picker for choosing your own colours is provided by the browser and are not part of AdapTable



## UI Elements
To Do

## Entitlements
To Do

## FAQ

Can we change the colours for a Flashing Cell column?

Yes you can choose any colours you want for both the up and down change.

Can we change the default colours?

Not at runtime.  But developers can change what the default colours are which will affect all users.

Can we change the colour based on the row (e.g. depending on other values in the row, the flash will be different colours or duration)?

Not at present but its something we might add.

Can we add longer durations (i.e. for the flash to remain in place for 5 seconds or even until the cell is next updated)?

Not at present.  We have been asked to introduce the facility to keep a flash in place until the next cell edit but we are not yet decided whether to do that as part of flashing cells or introduce a new function that will offer this.



### Further Information

- [Flashing Cell State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_flashingcellstate_.flashingcellstate.html)

- [Flashing Cell Api](https://api.adaptabletools.com/interfaces/_src_api_flashingcellapi_.flashingcellapi.html)

- [Flashing Cell Demo](https://demo.adaptabletools.com/style/aggridflashingcelldemo)

