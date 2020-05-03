# Action Column (AdaptableFunction)

The Action Column ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ActionColumn`) Function enables the creation of special columns that contain buttons.

Action Columns are created at run-time based on definitions provided by developers at design-time in Predefined Config 

### How Action Columns work
There are 3 elements to providing an Action Column definition:

1. **Clicked Function**: An implementation for On('ActionColumnClicked') event which fires when an Action Column button is clicked.

    The event provides details of which column was clicked, the current and the data in the row.  
    
    Developers can subscribe to this event and perform any additional logic or functionality that is required.

    The Action Column Predefind Config contains the **name** of the function and the actual **implementation** is given in the [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options

2.  **Render Function**: The `RenderFunction` returns a string giving the full render contents of the Button that should display in the cell.

    > If this property is not set, then a regular button will appear in the column with the caption of the ButtonText property. A predicate function to decide if to show the Action Column

3.  **Should Render Predicate**: The `ShouldRenderPredicate` function returns a boolean value indicating whether the Action Column should display a button.

## UI Elements
None at present - it is provided only at design-time in Adaptable State

## Entitlements
Action Column supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can we create Action Columns at Run-Time**

No, they are a Design-Time only Function; they can be accessed at Run-Time but not created or edited.

### Further Information

- [Action Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_actioncolumnstate_.actioncolumnstate.html)

- [Action Column Api](https://api.adaptabletools.com/interfaces/_src_api_actioncolumnapi_.actioncolumnapi.html)

- [Action Column Demo](https://demo.adaptabletools.com/column/aggridactioncolumnsdemo)

- [Action Column Video](https://youtu.be/y0cDvtdmSKM)

- [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html)

