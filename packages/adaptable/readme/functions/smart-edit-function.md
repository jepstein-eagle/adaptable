# Smart Edit (AdaptableFunction)

The Smart Edit([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `SmartEdit`) Function provides a way to update multiple, contiguous numeric cells with a single mathematical operation (e.g. Multiply).


## UI Elements
To Do

## Entitlements
To Do

## FAQ

What are the Smart Edit operations available?

Currently the main mathematical operations: Add, Subtract, Multiply and Divide. More features will be added in future releases.

Can I use Smart Edit to bypass Cell Validation rules?

No, you cannot.  Smart Edit is aware of all Cell Validation rules and will warn or prevent you as applicable when a rule is breached.

Can I run a Smart Edit across multiple columns if they are all numeric?

No, Smart Edit can only be used on a single column at at time.  This is to ensure that all Cell Validation rules are adhered to.

My column contains strings in some cells and numbers in others.  Can I use Smart Edit on the numeric cells?

No - primarily because many of the underlying grids wouldn't be able to accept the edit.

Can I create custom Smart Edit rules (e.g. to move by bps or other amounts)?

Not at present but the Smart Edit Toolbar will soon contain a range of very advanced, customisable and exciting Smart Edit features 

Can I use Smart Edit to perform a bulk edit?

No, Smart Edit only updates existing cell values. if you want to replace the existing cell value with a new one entirely, please use the Bulk Update function.

### Further Information

To Do

