# Advanced Search (AdaptableFunction)

The Advanced Search Function ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): AdvancedSearch) enables you to build complex searches using [*Expressions*](https://api.adaptabletools.com/classes/_src_predefinedconfig_common_expression_.expression.html) (aka Queries)

These searches can include a very wide variety of *Search Criteria* and run across multiple columns.

When you apply the Advanced Search AdapTable will only display those rows that match all of the Conditions in the Query. (For more information on creating queries see Queries).

Advanced Searches are named and saved and, therefore, available for re-use.

### UI Elements
Advanced Search includes the following UI Elements:

- **Popup** - Shows a list of existing Advanced Searches with *Edit* and *Delete* buttons, and a Radio Button to select one to be run.  Plus an *Add* button to start the Advanced Search Wizard.

- Bah

### Entitlements
Advanced Search supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: The User can run any Advanced Searches provided in Predefined Config but not edit or delete them or add others.

Can we apply searches on the server?

Not currently, but this will be possible in the AdapTable Server Edition which is scheduled to be released in late 2020.

Can we ship the application to users with existing searches?

Yes. You can create as many 'predefined' Adaptable Objects as you require, including Advanced Searches.

Does Advanced Search update if I edit the data in the grid?

Yes it does. As soon as you make an edit AdapTable will re-evaluate if that row should be visible or not and react accordingly.

Note that this is the default behaviour. You can change this to Never, or only after a ThrottleDelay by setting the filterActionOnUserDataChange property in Adaptable Options. See Filter Options for more information.

Does Advanced Search update if the underlying data changes?

That depends on what you have specified for the filterActionOnExternalDataChange property in Adaptable Options.

The default is Never meaning that it wont update as ticking data changes or the underlying data set changes. But you can change this to Always or after a ThrottleDelay. See Layout Options for more information.

### Further Information
Links to other resources

### Demo

Visit our [Demo Site](https://demo.adaptabletools.com) to see many of the AdaptableFunctions in AdapTable in action.
