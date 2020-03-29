** Server Validation ** 

Can we swallow the Validation and return nothing?

Yes you can. You have the option in Server Validation of returning:

the original value - this will indicate that validation has succeeded

a replacement value - this new value will be used instead

nothing - the edit will persist in the Grid but presumably you will then update the DataSource in other ways - (perhaps via the Grid API).



** Actio Column **
Is this a strategy?  i think it needs to be...
Can I render the button in the Action Column?

Yes. You can provide your own RenderFunction which can return a button that fits your requirements

What happens if I don't want a button in a particular row?

Provide an implementation for optional ShouldRenderPredicate property when you define the Action Column. This will return true / false for each row if the button should be displayed.

How do I know when a button in an Action Column has been clicked?

Each time a button is clicked in an ActionColumn, AdapTable will fire an ActionColumnClicked event. You can listen to this event and respond as appropriate. The args for this event contain the Column, the row and the row node. See the api docs for more information.

Can I delete an Action Column at run time?

No, not at the moment. Action Column is considered to be Design Time State - which means that it is provided by developers as Predefined Config and cannot be overriden and saved by users at Run Time.



Appendix

Column Header Menu Options

Option

Columns

Description

Create Cell Validation Rule

All

Opens Cell Validation wizard

Create Conditional Style

All

Opens Conditional Style wizard

Create User Filter

All

Opens User Filter wizard

Create [or Edit] Custom Sort

All

Opens Custom Sort wizard

Create Plus/Minus Nudge Rule

Number

Opens Plus/Minus wizard

Create [or Edit] Percent Bar

Number

Opens Percent Bar wizard

Select Column

All

Selects all the values in the Column.

Hide Column

All

Hides the column from the grid.

Turn Flashing Cells On / Off

Number

Turns Flashing Cell On or Off for that Column.

Edit Calculated Column

Calculated Column

Opens Calculated Column wizard

Edit FreeText Column

FreeText Column

Opens Free Text Column wizard

Show Column Information

All

Opens Column Information popup

Create [or Edit] Format Column

All

Opens Format Column wizard

Hide [or Show] Dashboard

All

Hides / Shows the Dashboard above the grid.

Clear Column Filter

All

Clears the Filter on a column (if one exists)

Hide [or Show] Quick Filter

All (if filterable)

Hides / Shows Quick Filter bar.

Clear Updated Rows

All

Clears rows that have been styled via Updated Rows function.

Context Menu Options

Option

When Shown

Clear Alerts

If the cell is currently highlighted as the result of an Alert

Show Column Chooser

Always

Clear Updated Row

If the cell is in a row which has been highlighted a different colour after update (via the Updated Rows function).
