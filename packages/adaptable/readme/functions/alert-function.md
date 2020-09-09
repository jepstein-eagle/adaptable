# Alert (AdaptableFunction)

The Alert Function enables the creation of powerful and flexible Alerts that can respond to a wide variety of different events.


## Alert Definitions

The Alert State contains a group of `AlertDefinition` objects - each of which defines a rule which - when met - will fire the Alert.

> Alert Definitions can be provided at design-time (through `AlertDefinitions` in [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_alertstate_.alertstate.html)) or at run-time through the UI (if Entitlements allow).

The Alert Definition uses a **Predicate** - the same boolean function as is used as in filters - which has a type (e.g. GreaterThan) and, optionally, inputs (e.g. 100)

> Developers can easily provide their own Custom Predicates to create bespoke validation rules.

### Using a Query

In more advanced scenarios (e.g. if you want the Alert Definition to look not only at the cell being edited but also at other values in the row) you can, additionally, use a **Query**.  

When this is added, the Alert will only be fired if **both** the Predicate and the Query return _true_.

> Alerts will trigger both as the result of direct user edits in the Grid and as data ticks in the underlying data source.

## Message Type

The `MessageType` of the Alert sets what type of of Message is displayed (and the colour will vary accordingly).  The available values are:

- **Success** - (default colour is green)
  
- **Info**  - (default colour is blue)

- **Warning** - (default colour is amber)

- **Error** - (default colour is red)

## Alert Properties

The `AlertProperties` property of `AlertDefinition` contains a number of properties to configure the grid's behaviour when an Alert is triggered.

Options for displaying an Alert include:

- **Display a Popup** - useful for very important Alerts

- **Colour the Cell** where the data changed that triggered the Alert (based on the Alert's `MessageType`)

- **Jump to Cell** so that the Grid will immediately show the row which contains the cell that triggered the Alert

- **Show the Alert details** in a Div element (that you specify in Alert State)

> Note: All Alerts when triggered will display (and update the count) in the Alert Toolbar and Alert Tool Panel.
>
> Additionally, all Alerts will fire the `AlertFired` event (the contents of which will be also sent to the console).

## Alert Definition Scope

Like many objects in AdapTable, Alert uses **Scope** to determine **where** an Alert should be applied.

The Scope can be one, some or all columns, or it can be all columns of a particular DataType (or DataTypes).

## UI Elements

Alerts includes the following UI Elements:

- **Popup** - Shows a list of existing Alerts with *Edit* and *Delete* buttons.  Plus an *Add* button to start the Alerts Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Alerts.

- **Toolbar** - Updates when an Alert is triggered; contains an info button which when clicked gives full details of each Alert.

- **Tool Panel** - Same as Toolbar above.

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

- [Run-Time Access Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-runtime-access-guide.md)