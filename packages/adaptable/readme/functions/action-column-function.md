# Action Column (AdaptableFunction)

The Action Column ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ActionColumn`) Function enables the creation of special columns that contain buttons.

Action Columns are created at run-time based on definitions provided by developers at design-time in Predefined Config 

### How Action Columns work
There are 3 elements to providing an Action Column definition:

1. **Clicked Function**: An implementation for On('ActionColumnClicked') event which fires when an Action Column button is clicked.

    The event provides details of which column was clicked, the current and the data in the row.  
    
    Developers can subscribe to this event and perform any additional logic or functionality that is required.


2.  A predicate function to decide if to show the Action Column

3.  A function to allow you to provide your own display for the button.

## UI Elements
None at present - it is provided only at design-time in Adaptable State

## Entitlements
Action Column supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

To Do

### Further Information

- [Action Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_actioncolumnstate_.actioncolumnstate.html)

- [Action Column Api](https://api.adaptabletools.com/interfaces/_src_api_actioncolumnapi_.actioncolumnapi.html)

- [Action Column Demo](https://demo.adaptabletools.com/column/aggridactioncolumnsdemo)

- [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html)

