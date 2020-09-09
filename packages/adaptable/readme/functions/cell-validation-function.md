# Cell Validation (AdaptableFunction)

The Cell Validation Function enables you to validate proposed cell edits and disallow them where they broke custom rules.

> Cell Validation Rules take place on the client.  AdapTable also offers the ability - in Edit Options - to provide Server Validation: where an edit is checked on the server and either the same, a new or no value is returned.

## Validation Rules

Cell Validation is based on a `CellValidationRule` which determines whether or not a cell edit is valid.

This uses a **Predicate** - the same object as is used as in filters - which has a type (e.g. GreaterThan) and, optionally, inputs (e.g. 100)

> Developers can easily provide their own Custom Predicates to create bespoke validation rules.

### Using a Query

In more advanced scenarios (e.g. if you want the rule to look not only at the cell being edited but also at other values in the row) the Cell Validation Rule can additionally use a **Query**.  When this is added, the Cell Validation Rule will only be applied if **both** the Predicate and the Query return _true_.

### Behaviour when a Rule is triggered

There are 2 potential outcomes for what happens when a cell validation rule is broken:

1.  **Prevent the Cell Edit**: The proposed change will be disallowed and the cell being edited will return to its initial pre-edited value.

2.  **Show a Warning**: The user will receive a warning that the proposed data edit will break validation rules. There is the option of cancelling the change or overriding the rule so that the change takes place. If they do the latter, a reason must be provided.

> If Audit Log is running, this explanation will be included as part of the general audit stream. 

## UI Elements
Cell Validation includes the following UI Elements:

- **Popup** - Shows a list of existing Cell Validations with *Edit* and *Delete* buttons, plus an *Add* button to start the Cell Validation Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Cell Validations.

- **Column Menu** - `Create Cell Validation Rule` Menu Item starts the Cell Validation wizard for that column.


## Entitlements
Cell Validation supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User and **no Cell Validations will be triggered**

- **ReadOnly**: User can see Cell Validations defined in Predefined Config but not edit or delete them, nor add others.


## FAQ

**Why add validation on the client - surely it should take place on the server?**

You are right, validation should ideally take place on the server and hopefully it does for our users. 

The Cell Validation function is not designed to replace Server Validation [which AdapTable also offers](https://demo.adaptabletools.com/edit/aggridservervalidationdemo)

Instead Cell Validation specifically deals with 3 common use cases:

- to add an extra level of validation so that you can prevent or set warnings for edits which are usually permitted, but which in particular scenarios or use cases should be avoided or checked first (e.g. if things are particularly volatile and you want to limit how much a cell can change by).

- to avoid unnecessary round trips to the server, particularly if this will have other knock-on consequences or effect other users that might see their screen flash first with the new value and then again with the old value

- as a temporary measure before Server Validation has been added; like all AdapTable objects, Cell Validation rules will ome into effect immediately after that they are created - there is no down-time needed, nor any custom development required, and no systems need to be restarted.

**I dont want to stop the edit when a rule is broken but I do want to know; is that possible?**

Yes set the `ActionMode` to 'Warn User'.  This will display a warning that you can override (with an accompanying comment).  If this happens then the edit completes.


### Further Information
- [Cell Validation State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellvalidationstate_.cellvalidationstate.html)

- [Cell Validation Api](https://api.adaptabletools.com/interfaces/_src_api_cellvalidationapi_.cellvalidationapi.html)

- [Edit Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_editoptions_.editoptions.html)

- [Cell Validation Demo](https://demo.adaptabletools.com/edit/aggridcellvalidationdemo)
