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