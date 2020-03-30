# AdapTable UI FAQ

**Do you support grouping?**

f the underlying grid has grouping then AdapTable will support it. Additionally we are planning to write grouping for the Hypergrid as this is one of the most commonly received feature requests we receive.

**Do you support banded columns?**

Yes, if the underlying grid supports it. For instance, ag-Grid has Column Groups which are essentially banded columns and they are fully supported by AdapTable.

### Shortcuts

**Can we open Function popups via a keyboard shortcut?**

Not at present, though we may add this in a future version. You can currently access Functions either from the Functions Dropdown, or from a Function Bookmark - both in the Dashboard. Some Functions additionally have a toolbar to provide easy access to the functionality and avoid needing to use the popup altogether.

### Grid Columns

**Can we include our own cell editors? If we have custom editors can we use them?**

Yes. You can use any editors that the underlying grid supports. AdapTable doesn't have any view on what cell editors are used; all it needs to know is the previous and changed cell value. So you can use any cell editors that you wish.

**Can I have a cell with a button?**

Yes you can put anything you want in a column or cell. If you have a button you will need to write the event logic but AdapTable won't prevent it from working.

Additionally AdapTable provides the ActionColumn function which will create a button for you (that you can render how you want, and will fire an event when the button is clicked).

**Do you support the grid's readonly columns?**

Yes. If a column has been set to be readonly when the grid is defined, none of AdapTable's editing functions (e.g. Smart Edit, Shortcuts, Plus / Minus etc) will work.  

Similarly AdapTable will respect it if the column is set to not filterable or not sortable.

**Do you support readonly cells?**

Not at present but we plan to support that in a forthcoming release.

### Colours

**Can we provide our own colours for the colour palette instead of using your defaults colours?**

Yes, you can supply your own colour palette at design time which will ship with the system containing the grid. This is done through User Interface Config.

### Wizards

**Can we see a summary in the Wizard of what steps have been completed so far?**

Yes. Each wizard displays a list of all the required steps along the top, together with an indication of the current step.

**Can this wizard summary be clickable?**

At the moment its just a static representation of the steps available but in a future release the wizard legend will also be clickable (where appropriate). We have recently added a finish button so that when editing an existing item you don't need to click all the way to the end if just making one change.

### Floating Filters

**Is there a way to show / hide the Floating Filter?**

You can do so in 2 ways: from any column header menu, or from the Column Filter toolbar. The latter has a show/hide button that.

**Why does my Grid not have a Floating Filter?**

Not every vendor grid contains a Floating Filter. AdapTable uses an existing floating filter if one is there in the Vendor Grid (and extends the functionality) but it wont create one if one doesn't already exist.

### Modals

**Is there a way to ensure that modal windows only take up their own screen estate and don't encroach on other windows?**

Yes, set the modalContainer property in AdaptableOptions to Grid.

### Menu

**Why can I not see the Context Menu in AdapTable (using ag-Grid)?**

If you are using a trackpad then make sure that the `allowContextMenuWithControlKey` is set to true.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).