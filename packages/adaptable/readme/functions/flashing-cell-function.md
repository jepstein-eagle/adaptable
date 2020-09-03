# Flashing Cell (AdaptableFunction)

The Flashing Cell Function enables you to set numeric cells to flash briefly as their contents change.

By default, flashing cells is disabled for all numeric columns. 

If you want to enable flashing cells on every column, tick the All Columns checkbox. If you only want flashing cells to be enabled on some columns, tick the Live checkbox for the columns you want to flash (or use the appropriate Column Header Menu).

For each column that you want flashing cells enabled, you can set the Flash Duration, Up Colour and Down Colour properties as appropriate.

> The colour picker for choosing your own colours is provided by the browser and are not part of AdapTable

The Flashing Cells Function is a useful visual aid for fast ticking data - for less frequent updating data where you want to see (and jump to) the row which has changed use the Updated Rows Function.


## UI Elements
- **Popup** - Shows a list of all numeric cells with those curretly 'flashing' checked; in this popup Flashing Cell colours and durations can be edited.

- **Column Menu** - `Turn Flashing Cell On` (or 'Off') Menu Item in numeric columns will enable / disable Flashing Cell function for that Column.

## Entitlements
Flashing Cell supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can see columns with Flashing Cell defined in Predefined Config flash but not add, edit or remove them.

## FAQ

**Can we change the colours for a Flashing Cell column?**

Yes you can choose any colours you want for both the up and down change.

**Can we change the default colours?**

Not at runtime.  But developers can change what the default colours are which will affect all users.

**Can we change the colour based on the row (e.g. depending on other values in the row, the flash will be different colours or duration)?**

Not at present but its something we might add.

**Can we add longer durations (i.e. for the flash to remain in place for 5 seconds or even until the cell is next updated)?**

Not at presen though it is something we might add.

However, you might also want to look at the Updated Rows function which is more suited for infrequent updates where you want to see the change remain visually on the screen for much longer.


### Further Information

- [Flashing Cell State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_flashingcellstate_.flashingcellstate.html)

- [Flashing Cell Api](https://api.adaptabletools.com/interfaces/_src_api_flashingcellapi_.flashingcellapi.html)

- [Flashing Cell Demo](https://demo.adaptabletools.com/style/aggridflashingcelldemo)