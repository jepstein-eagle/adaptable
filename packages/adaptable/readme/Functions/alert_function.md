# Alert (AdaptableFunction)

The Alert ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Alert`) Function enables the creation of powerful and flexible Alerts that can respond to a wide variety of different events.

Alerts can be provided at design-time (through `AlertDefinitions` in [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_alertstate_.alertstate.html)) or at run-time through the UI (if Entitlements allow).

Alerts are triggered, typically, when data changes through a [QueryRange](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_common_expression_.queryrange.html) that you specify.  

A QueryRange can include any type of data change, from all changes for a particular column to a very specific use case (e.g. if the Price Column change > 10%, or Country Column StartsWith 'c').

Alerts can, additionally, include [*Expressions*](https://api.adaptabletools.com/classes/_src_predefinedconfig_common_expression_.expression.html) (aka Queries) as the trigger (e.g. if the Price Column change > 10% AND Currency Column = 'EUR')

> Alerts will trigger both as the result of direct user edits in the Grid and as data ticks in the underlying data source.

## Alert Properties

You can set the `MessageType` of the Alert - this will be one "Success", "Info", "Warning" or "Error" (and the colour will vary accordingly).

You can also specify - through the `AlertProperties` prop what happens when an Alert is triggered.

All Alerts will update in the Alert Toolbar and Alert Tool Panel (see below) but additionally they can:

- **Display a Popup** - useful for very important Alerts

- **Colour the Cell** where the data changed that triggered the cell (based on the Alert's `MessageType`)

- **Jump to Cell** so that the Grid will immediately show the row which contains the cell that triggered the Alert

- **Show the Alert details** in a Div (that you specify in Alert State)


## UI Elements
Alerts includes the following UI Elements:

- **Popup** - Shows a list of existing Alerts with *Edit* and *Delete* buttons.  Plus an *Add* button to start the Alerts Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Alerts.

- **Toolbar** - Updates whenever an Alert is triggered.  Contains an info button which when clicked gives full details of each Alert.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu Item** - None.

- **Context Menu Item** - `Clear Alert` Menu Item opens clears a Cell if it has been coloured by an Alert (only visible if selected cell if one which has triggered a Live Alert and has been coloured by it).

## Entitlements
Alerts supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User and any Alerts supplied in Predefined Config will be ignored.

- **ReadOnly**: Alerts will trigger as normal but users cannot not edit or delete them, nor create others.

## FAQ

**Can we show Alerts in the System Tray?**

Not at the moment but that is something we hope to have available soon for those users who access AdapTable in the OpenFin container.

**I dont want my Alerts to pop-up. Can I prevent that?**

Yes, when you create an Alert Definition you can stipulate, among other things, whether the Alert will popup. See Alert State for the full Alert Definition.


### Further Information

- [Alerts State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_alertstate_.alertstate.html)

- [Alerts Api](https://api.adaptabletools.com/interfaces/_src_api_alertapi_.alertapi.html)

- [Alert Fired Event](https://api.adaptabletools.com/interfaces/_src_api_events_alertfired_.alertfiredeventargs.html)

- [Alerts Demo](https://demo.adaptabletools.com/alertsmessages/aggridalertdemo)

