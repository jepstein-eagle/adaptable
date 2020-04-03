# Smart Edit (AdaptableFunction)

The Smart Edit([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `SmartEdit`) Function provides a way to update multiple, contiguous numeric cells with a single mathematical operation (e.g. Multiply).

Rather than users needing to change multiple columns individually, Smart Edit enables **the selection of a group of cells in one numeric column**, and for a single operation to be applied on all the cells (based on each cell value).

> If the proposed Smart Edit breaks a Cell Validation Rule then it will be prevented or display a warning as appropriate.

### Smart Edit Operations
The following mathematical operations are available:

- Addition
- Subraction
- Multiplication
- Division

## UI Elements
Smart Edit includes the following UI Elements:

- **Popup** - Allows you to perform a Smart Edit operation on selected cells.  Will show what the new value for each selected cell will be and also whether any cell validation rules will be broken as a result of the Smart Edit.

- **Toolbar** - Enables Smart Edit to be performed and to choose the Operation to use.

- **Tool Panel** - Same as Toolbar above.

- **Context Menu** - `Apply Smart Edit` Menu Item opens the Smart Edit popup (only visible if selected cells are editable, numeric and from on a single column).

## Entitlements
Smart Edit supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**What are the Smart Edit operations available?**

Currently the main mathematical operations: Add, Subtract, Multiply and Divide. More features will be added in future releases.

**Can I use Smart Edit to bypass Cell Validation rules?**

No, you cannot.  Smart Edit is aware of all Cell Validation rules and will warn or prevent you as applicable when a rule is breached.

**Can I run a Smart Edit across multiple columns if they are all numeric?**

No, Smart Edit can only be used on a single column at at time.  This is to ensure that all Cell Validation rules are adhered to.

**My column contains strings in some cells and numbers in others.  Can I use Smart Edit on the numeric cells?**

No - primarily because many of the underlying grids wouldn't be able to accept the edit.

**Can I create custom Smart Edit rules (e.g. to move by bps or other amounts)?**

Not at present but the Smart Edit Toolbar will soon contain a range of very advanced, customisable and exciting Smart Edit features 

**Can I use Smart Edit to perform a bulk edit?**

No, Smart Edit only updates existing cell values. if you want to replace the existing cell value with a new one entirely, please use the [Smart Edit Function](./smart-edit-function.md) Function.

### Further Information

- [Smart Edit State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_smarteditstate_.smarteditstate.html)

- [Smart Edit Api](https://api.adaptabletools.com/interfaces/_src_api_smarteditapi_.smarteditapi.html)

- [Edit Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_editoptions_.editoptions.html)

- [Smart Edit Demo](https://demo.adaptabletools.com/edit/aggridsmarteditdemo)

