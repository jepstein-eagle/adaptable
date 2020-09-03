# Action Column (AdaptableFunction)

The Action Column Function enables the creation of special columns that contain buttons.

Action Columns are created at run-time based on definitions provided by developers at design-time in Predefined Config 

### How Action Columns work

There are 3 elements to providing an Action Column definition:

1. **Clicked Function**: An implementation for On('ActionColumnClicked') event which fires when an Action Column button is clicked.

    The event provides details of which column was clicked, the current and the data in the row.  
    
    Developers can subscribe to this event and perform any additional logic or functionality that is required.

    The Action Column Predefind Config contains the **name** of the function and the actual **implementation** is given in the [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options.

2.  **Render Function**: The `RenderFunction` returns a string giving the full render contents of the Button that should display in the cell.

    > If this property is not set, then a regular button will appear in the column with the caption of the ButtonText property. A predicate function to decide if to show the Action Column

     The Action Column Predefind Config contains the **name** of the function and the actual **implementation** is given in the [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options


3.  **Should Render Predicate**: The `ShouldRenderPredicate` function returns a boolean value indicating whether the Action Column should display a button.

    The Action Column Predefind Config contains the **name** of the function and the actual **implementation** is given in the [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options


## UI Elements

None at present - it is provided only at design-time in Adaptable State

## Entitlements

Action Column supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can we choose how to render the button in the Action Column?**

Yes. You can provide your own RenderFunction which can return a button that fits your requirements

**What happens if I don't want a button in a particular row?**

Provide an implementation for optional ShouldRenderPredicate property when you define the Action Column. This will return true / false for each row if the button should be displayed.

**How do I know when a button in an Action Column has been clicked?**

Each time a button is clicked in an ActionColumn, AdapTable will fire an ActionColumnClicked event. You can listen to this event and respond as appropriate. The args for this event contain the Column, the row and the row node. See the api docs for more information.

**Can I delete an Action Column at run time?**

No, not at the moment. Action Column is considered to be Design Time State - which means that it is provided by developers as Predefined Config and cannot be overriden and saved by users at Run Time.

**Can we create / update / delete Action Columns at Run-Time?**

No, they are a Design-Time only Function; they can be accessed at Run-Time but not created or edited.

**Why do we need to provide the Function Name and Function Implementation separately?**

This is because Predefined Config is stored as (stringified) JSON and so it cannot persist functions.  

As a result the convention in AdapTable is for the function name to be provided in Predefined Config but the actual implementation to be supplied in the [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options.

### Further Information

- [Action Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_actioncolumnstate_.actioncolumnstate.html)

- [Action Column Api](https://api.adaptabletools.com/interfaces/_src_api_actioncolumnapi_.actioncolumnapi.html)

- [Action Column Demo](https://demo.adaptabletools.com/column/aggridactioncolumnsdemo)

- [Action Column Video](https://youtu.be/y0cDvtdmSKM)

- [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html)g