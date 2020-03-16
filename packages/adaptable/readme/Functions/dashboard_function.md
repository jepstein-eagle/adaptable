# Dashboard (AdaptableFunction)

The Dashboard ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Dashboard`) is the area above the Grid that contains tabs, toolbars and frequently used buttons.

The Dashboard can be heavily customised so that it fits your needs.

## Dashboard Visiblity Modes
There are 3 visibility modes for the Dashboard:

1. **Full** - This shows everything in the Dashboard opened up with one tab open.

2. **Collapsed** - This shows just the Dashboard Header - situated above the Grid.

  > To collapse / uncollapse the Dashboard click on a Dashboard tab.

3. **Floating** - This shows just the Dashboard Header in reduced width and it can be dragged to any position by clicking on the Name (the mouse will change to a cross).

  > To float / unfloat the Dashboard double-click on the Name in the Dashboard Header (or click the 'carat' at the right hand side).

## Dashboard Elements
The Dashboard contains the following elements:

- **Functions Dropdown** - a dropdown on the left hand side of the Dashboard Header that shows a list of all Functions in AdapTable to which the user is 'Entitled'.  Clicking an item in this list will open the popup associated with that Function.

    > This dropdown can be hidden via the `ShowFunctionsDropdown` property of Dashboard State.

- **Tabs** - collections of Toolbars with a given name (see below for more information on Toolbars) 
  
    > If there are no Tabs present then AdapTable will create a default one called 'Toolbars' which will contain the `VisibleButtons`collection curently in State; if there is none, then it will use the default set.
    
- **Function Buttons** - a group of 'shortcut' Function buttons which open the popup associated with that Function.
  
  > This list can be set via the `VisibleButtons` property of Dashboard State.

- **Quick Search** - a simple text search across all visible columns (using the Quick Search Function)
  
  > This can be hidden via the `ShowQuickSearchInHeader` property of Dashboard State.

- **Configure Dashboard Button** - button on the right hand side of the Dashboard Header which opens the Dashboard popup, facilitating the management of Tabs and Visible Buttons.
  

## Toolbars
bsss

### Custom Toolbars
In addition to the Toolbars shipped by AdapTable, users can create their own Toolbars at Design-Time.  

Once created, they are treated as full toolbars and can be placed in any Tab as requested.

Custom Toolbars contain 2 sections, either of both which can be populated:
  
- a div where users can render any content that they want; typically they will listen to the 'ToolbarVisibilityChanged' event and then render their content as required.

- a div which will display any buttons that users provide via the ToolbarButtons property
  
See ([Custom Toolbars Developer Documentation](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_dashboardstate_.customtoolbar.html) for more information.

## UI Elements
Dasbhoard includes the following UI Elements:

- **Popup** - Enables 

- **Toolbar** - Enables Dasbhoard to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu** - None

- **Context Menu** - `Apply Dasbhoard` Menu Item opens Dasbhoard popup (only visible if selected cells are editable).

## Entitlements
Dasbhoard supports these Entitlement Rules:

- **Full**: Everything in the Dashboard is visible to the User

- **Hidden**: The Dashboard is completely hidden

- **ReadOnly**: N/A

## FAQ

**Is there a limit to the amount of function buttons that I can show?**

No, you can choose to show as many as you want?

**Can I hide the Functions or Columns dropdown?**

Yes, you have the ability through in the UI (Dashboard function) or through Dashboard Config to show / hide all the elements in the Home Toolbar (the Toolbar on the left side).

**Can I hide or minimise the Dashboard?**

Yes, you can do both.  To minimise the dashboard click the small arrow in the top left of the first toolbar (and click again to maximise).  To hide altogether choose the appropriate option from the column header menu.

**Can I add my own content to the Dashboard?**

Yes, Dashboard state includes a 'Custom Toolbars' collection precisely for this purpose. 


### Further Information
- [Dasbhoard State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellsummarystate_.cellsummarystate.html)

- [Dasbhoard Api](https://api.adaptabletools.com/interfaces/_src_api_cellsummaryapi_.cellsummaryapi.html)

- [Dasbhoard Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo)
