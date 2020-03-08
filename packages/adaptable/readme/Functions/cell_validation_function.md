# Cell Validation (AdaptableFunction)

The Cell Validation ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `CellValidation`) Function enables you to validate proposed cell edits through the creation of custom rules.

When you create your cell validation rules, they come into effect immediately. For example, if you need quickly to make a column read-only, you can create a cell validation rule that prevents all changes being made to that column, and the read-only rule is applied immediately. There is no down-time as you do not need to restart your system.

You can choose between 2 types of cell validation rule:

Disallow All Edits: Any attempt to change the values in any cell in the column will break the cell validation rule.

Disallow Only Edits that break a Cell Validation Rule: The cell value can be changed so long as it doesn't break a custom validation rule.

And you can choose between 2 outcomes for what happens when a cell validation is broken:

Prevent the Cell Edit: The change will not be allowed and the cell being edited will maintain its initial pre-edited value.

Show a Warning. Users will receive a warning when a proposed data edit will break validation rules. They have the option of cancelling the change or overriding the rule so that the change takes place. If they do the latter, they must provide a reason (which is then sent to the Audit Log).

Note
If you want, additionally, to make the Cell Validation only applicable dependent on other values in the row sure the Use Validation Query checkbox is checked. This will open the standard Query screen and the cell validation rule will only be applied if a row has values that match the conditions you define.  For more information on building and editing Queries using multiple Conditions and Criteria see Queries.

Tip
You are also able to provide Server Validation - where an edit is checked on the server and either the same, a new or no value is returned.

This is provided via Edit Options.

For more information see Demo Site - API - Predefined Config - FAQ - Videos




## UI Elements
Cell Validation includes the following UI Elements:

- **Popup** - Shows a list of existing Cell Validations with *Edit* and *Delete* buttons, plus an *Add* button to start the Cell Validation Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Cell Validations.

- **Toolbar** - None.

- **Tool Panel** - None.

- **Column Menu** - `Create Cell Validation Rule` Menu Item allows starts the Cell Validation wizard for that column.

- **Context Menu** - None

## Entitlements
Cell Validation supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User and **no Cell Validations will be triggered**

- **ReadOnly**: User can see the Calculated Columns defined in Predefined Config but not edit or delete them, nor add others.


## FAQ

**Why add validation on the client - surely it should take place on the server?**

You are right, validation should ideally take place on the server and hopefully it does for our users. The Cell Validation function is not designed to replace server validation; instead it specifically deals with 2 common use cases:

to add an extra level of validation so that you can prevent or set warnings for edits which are usually permitted, but which in particular scenarios or use cases should be avoided or checked first (e.g. if things are particularly volatile and you want to limit how much a cell can change by)

to avoid unnecessary round trips to the server, particularly if this will have other knock-on consequences or effect other users

**I dont want to stop the edit when a rule is broken but I do want to know; is that possible?**

Yes there are 2 possible actions when a Cell Validation rule is breached:

Prevent - the edit won't happen under any circumstances.

Warning - the user is shown a warning which he can override (with an accompanying comment).  If this happens then the edit completes.

It seems as though the second of these is more appropriate in this use case.

> Note: AdapTable only allows 'Warning' overrides when an associated explanation is provided; if Audit Log is running, this explanation will be sent as part of the general audit stream.


### Further Information
- [Cell Validation State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellvalidationstate_.cellvalidationstate.html)

- [Cell Validation Api](https://api.adaptabletools.com/interfaces/_src_api_cellvalidationapi_.cellvalidationapi.html)

- [Cell Validation Demo](https://demo.adaptableblotter.com/edit/aggridcellvalidationdemo)
