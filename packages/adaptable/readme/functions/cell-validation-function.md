# Cell Validation (AdaptableFunction)

The Cell Validation Function enables you to validate proposed cell edits through the creation of custom rules.

## Validation Rules

The Rule is based on a **Predicate** - the same as is used as in filters.

This means that you can easily provide your own Custom Predicates to create your own validation rules.

> The Cell Validation Rule can be dependent also on other values in the row by using an using **Query**.  When this is added, the Cell Validation Rule will only be applied if a row has values that match the conditions defined.

There are 2 outcomes for what happens when a cell validation rule is broken:

1.  **Prevent the Cell Edit**: The proposed change will be disallowed and the cell being edited will return to its initial pre-edited value.

2.  **Show a Warning**: The user will receive a warning that the proposed data edit will break validation rules. There is the option of cancelling the change or overriding the rule so that the change takes place. If they do the latter, a reason must be provided (which is then sent to the Audit Log if that is running).

> Cell Validation Rules take place on the client.  AdapTable also offers the ability - in Edit Options - to provide Server Validation: where an edit is checked on the server and either the same, a new or no value is returned.

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
> One advantage of Cell Validation rules is that they come into effect immediately after that they are created. There is no down-time needed, nor any custom development required, and no systems need to be restarted.
**Why add validation on the client - surely it should take place on the server?**

You are right, validation should ideally take place on the server and hopefully it does for our users. 

The Cell Validation function is not designed to replace Server Validation [which AdapTable also offers](https://demo.adaptabletools.com/edit/aggridservervalidationdemo)

Instead Cell Validation specifically deals with 2 common use cases:

- to add an extra level of validation so that you can prevent or set warnings for edits which are usually permitted, but which in particular scenarios or use cases should be avoided or checked first (e.g. if things are particularly volatile and you want to limit how much a cell can change by).

- to avoid unnecessary round trips to the server, particularly if this will have other knock-on consequences or effect other users

**I dont want to stop the edit when a rule is broken but I do want to know; is that possible?**

Yes there are 2 possible actions when a Cell Validation rule is breached:

- Prevent - the edit won't happen under any circumstances.

- Warning - the user is shown a warning which he can override (with an accompanying comment).  If this happens then the edit completes.

It seems as though the second of these is more appropriate in this use case.

> Note: AdapTable only allows 'Warning' overrides when an associated explanation is provided; if Audit Log is running, this explanation will be sent as part of the general audit stream.


### Further Information
- [Cell Validation State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellvalidationstate_.cellvalidationstate.html)

- [Cell Validation Api](https://api.adaptabletools.com/interfaces/_src_api_cellvalidationapi_.cellvalidationapi.html)

- [Edit Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_editoptions_.editoptions.html)

- [Cell Validation Demo](https://demo.adaptabletools.com/edit/aggridcellvalidationdemo)
