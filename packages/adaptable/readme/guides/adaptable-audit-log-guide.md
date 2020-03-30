# AdapTable Audit Log Guide

The Audit Log - if enabled - streams messages about AdapTable activity to an HTTP Channel for you to listen to (see Audit Log for more information).

Every single action in AdapTable can, optionally, be fully audited for internal review purposes: each keystroke, menu click, configuration change, data edit and ticking data change.

This provides admins and support with complete oversight over everything that ever happens in AdapTable.

For instance they can set up an alert to be informed whenever a value changes in a particular column, or if the new value exceeds set limits; or you can run reports showing a particular user's activity, or how data has changed over any time period.

## Audit Log Scope

It is important to note that AdapTable has **no knowledge of the messages Audit Log sends, nor where they are sent**.  

All Information sent to Audit Log lives entirely within users' systems at a internal destination specified by them.

Likewise, AdapTable has no ability to access Audit Log messages: they are only visible to, and accessible by, our users.​​

## How Audit Log Works

Audit Log is set up via the [Audit Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_auditoptions_.auditoptions.html) section of Adaptable Options.

Each Audit Log message is essentially a combination of 3 things, packaged as a simple JSON object:

- an `AuditMessage` - a description of the actual Audit Event
- an `AuditTrigger` - what caused the Audit Event to happen
- an `AuditDestination` - the location(s) to which an Audit Message can be dispatched

There are 5 AuditTriggers and 4 AuditDestinations.

As many AuditTriggers can be set as required, and for each `AuditTrigger`, as many AuditDestinations can be selected as needed.

> If no AuditTriggers are set, then AuditLog will be turned off.


### Audit Triggers

Audit Triggers are the 'events' in AdapTable that cause an Audit Log Message to be created and dispatched.

The 5 Audit Triggers are:

- **CellEdit**: whenever a cell in AdapTable is changed as a result of user action

- **TickingDataUpdate**: whenever the data in AdapTable is updated as a result of external action

- **FunctionEvent**: whenever an AdapTable function is run (e.g. Quick Search, Smart Edit, Export etc.)

- **UserStateChange**: whenever a change is made to the User's state (e.g. selected a new layout)

- **InternalStateChange**: whenever a change is made to AdapTable's internal state (e.g. new cells selected, a popup displayed). Note that this can be quite verbose.

### Audit Triggers

Audit Destinations are the locations to which an Audit Message can be dispatched.

The 4 available Audit Destinations are:

- **Http Channel**: If you choose this then you need to set up the channel, on which you can subsequently listen to Audit messages using your own internal reporting software (e.g. the Elastic Stack).  You can also, optionally, set the name of the Http Channel (or use the default of '/auditlog').

- **Console**: Audits messages to the console - useful for testing, support and debug purposes

- **Alert**: If you set this option for any Trigger, then you can should also choose the Type (e.g. 'Success', 'Info' etc) and whether to show it as a Popup.

- **Event**: If selected, you will be able to listen to the the `Audit Event` using the [Audit Event API](_src_api_auditeventapi_.auditeventapi.html)

> **The default for each option for each Audit Type is false** - meaning that audit is*only triggered** if you set at least one destination for one trigger to `true`.

--------------

### Example: Setting Audit Options

```ts
auditOptions = {
 auditCellEdits: {
   auditToHttpChannel: true,
 },
 auditFunctionEvents: {
   auditAsAlert: true,
 },
 auditInternalStateChanges: {
   auditAsEvent: true,
   auditAsAlert: true,
 },
 auditUserStateChanges: {
   auditAsEvent: true,
   auditToHttpChannel: true,
   auditAsAlert: true,
 },
auditTickingDataUpdates:{
   auditToConsole: true,
}
 httpChannel: '/MyChannel',
 pingInterval: 120,
 auditLogsSendInterval: 3,
};

```


## FAQ

**Can we filter which audit messages are sent via Audit Log?**

Yes, the Audit Options section of Adaptable Options allows you to specify which of the Audit Categories you want to enable (CellEdits, FunctionEvents, UserStateChanges and InternalStateChanges).

In addition, most reporting software will allow you to filter the messages that you receive so that you only report and save the ones in which you are interested.

**Where do you store the Audit Log messages?**

We don't store them anywhere - AdapTable simply streams all Audit Log messages. Its your responsibility to listen to this stream and persist the messages where most appropriate.

There is an option in Audit Options to send these messages just to the Console though most users prefer for them to be streamed to the Http Channel so that they can use software like the Elastic Stack to listen to them in advanced ways.

**What information is sent in an Audit Log message?**

That depends on the type of message. All messages have some common properties but others are added if its a function change or a cell edit.

**Can we turn off Audit Log if we don't need it?**

Yes that is straightforward to do and indeed its turned off by default. 

If none of the 4 AuditOptions in Audit Options are set to true then Audit will not be enabled.


## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/auditlog) to see a number of Audit Log demos

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
