# Dashboard (AdaptableFunction)

The Dashboard ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Dashboard`) is the area above the Grid that contains tabs, toolbars, frequently used buttons and search box.

The Dashboard can be heavily customised so that it fits your needs both in terms of contents and visibility.

**Note**: In v.6.1 (March 2020) the Dashboard was signficantly updated and improved with some previous properties now deprecated.  

>To facilitate this upgrade for existing users, a default Tab is created when AdapTable first loads after the upgrade, containing the Visible toolbars in the Adaptable State.

## Dashboard Visiblity Modes
There are 3 visibility modes for the Dashboard:

1. **Expanded** - This shows everything in the Dashboard - situated above the Grid - with one tab open.

    > There is an alternative 'inline' Expanded view available.

2. **Collapsed** - This shows just the Dashboard Header - situated above the Grid.

    > To collapse / expand the Dashboard click on a Dashboard tab.

3. **Floating** - This shows just the Dashboard Header in reduced width and it can be dragged to any position by clicking on the Name (the mouse will change to a cross).

    > To float / dock the Dashboard double-click on the Name in the Dashboard Header (or click the item in the Home Menu)

## Dashboard Contents
The Dashboard contains the following elements:

- **Functions Dropdown** - a dropdown on the left hand side of the Dashboard Header that shows a list of all Functions in AdapTable to which the user is 'Entitled'.  Clicking an item in this list will open the popup associated with that Function.

    > This dropdown can be hidden via the `ShowFunctionsDropdown` property of Dashboard State.

- **Tabs** - collections of Toolbars with a given name (see below for more information on Toolbars) 
  
    > If there are no Tabs present then AdapTable will create a default one called 'Toolbars' which will contain the `VisibleButtons`collection curently in State; if there is none, then it will use the default set.
    
- **Function Buttons** - a group of 'shortcut' buttons which each open the popup associated with that Function.
  
  > This list can be set via the `VisibleButtons` property of Dashboard State.

- **Quick Search** - a simple text search across all visible columns (using the Quick Search Function)
  
  > This can be hidden via the `ShowQuickSearchInHeader` property of Dashboard State.

- **Configure Dashboard Button** - button on the right hand side of the Dashboard Header which opens the Dashboard popup, facilitating the management of Tabs and Visible Buttons.
  

## Toolbars
AdapTable ships with a number of Function Toolbars.

These are essentially collections of controls which provide easy and quick access a single Function (e.g. the 'Advanced Search' Toolbar contains a dropdown showing all Advanced Searches together with buttons to add / edit / delete them).

Toolbars are grouped into Tabs to give users full control over which Toolbars are visible.

### Custom Toolbars
In addition to the Toolbars shipped by AdapTable, users can create their own Custom Toolbars at Design-Time.  

Once created, they are treated as full toolbars and can be placed in any Tab as required.

Custom Toolbars contain 2 sections, either of which can be populated:
  
- a div where users can render any content that they want; typically they will listen to the 'ToolbarVisibilityChanged' event and then render their content as required.

- a div which will display any buttons that users provide via the ToolbarButtons property
  
See [Custom Toolbars Developer Documentation](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_dashboardstate_.customtoolbar.html) for more information.

## UI Elements
The Dasbhoard Function includes the following UI Elements:

- **Dashboard** - Area above the Grid with Tabs, Function Buttons and Quick Search textbox.

- **Popup** - Enables the creation and editing of Tabs and Toolbars and the management of Function Buttons.

- **Tool Panel** - Facilitates changing the Dashboard Visibility Mode

- **Column Menu** - Facilitates changing the Dashboard Visibility Mode


## Entitlements
Dasbhoard supports these Entitlement Rules:

- **Full**: Everything in the Dashboard is visible to the User

- **Hidden**: The Dashboard is completely hidden

- **ReadOnly**: N/A

## FAQ

**Is there a limit to the amount of function buttons that I can show?**

No, you can choose to show as many as you want?

**Can I hide the Functions dropdown?**

Yes, via the `ShowFunctionsDropdown` property of Dashboard State

**Can I add my own content to the Dashboard?**

Yes, Dashboard state includes the 'Custom Toolbars' collection precisely for this purpose. 

**Why do I see a tab called 'Toolbars'?**

This is added automatically by AdapTable when you first upgrade to v6.1 (released March 2020).  It creates a new Tab which contains whatever Toolbars are currently visible in State. 

This Tab can be later replaced either in the UI, or in Predefined Config by setting a Revision Number.


### Further Information
- [Dashboard State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_dashboardstate_.dashboardstate.html)

- [Dashboard Api](https://api.adaptabletools.com/interfaces/_src_api_dashboardapi_.dashboardapi.html)

- [Dashboard Demos](https://demo.adaptabletools.com/dashboard)
