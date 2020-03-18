# AdapTable Run-Time Access Guide

Most of the work required by developers in regard to AdapTable is, obviously, done at Design-Time.

This list typically includes downloading and installing AdapTable, integrating it into your code, setting up AdapTableOptions and writing any Predefined Config you want so your instance is 'pre-loaded' with the correct objecs.

However there are a number of ways that developers can access and leverage AdapTable for the benefit of users.  These include:

- **Adaptable Api**: the primary way to access an AdapTable instance
- **Adaptable Events**: subscribe to some of the Events fired by AdapTable 
- **Notifications & Alerts**: tell your users when something has happened they need to know
- **System Status**: update users on the overall state of the application

 
## Adaptable Api
The main way to update AdapTable is through the comprehensive Adaptable Api.  This is returned by the static constructor and gives you full run-time access to all Adaptable State.

There are hundreds of methods you can use - which are detailed in our the [Api Developer Documentation](https://api.adaptableblotter.com/interfaces/_src_api_adaptableapi_.adaptableapi.html).

 
## Adaptable Events
AdapTable fires a number of events that will keep you informed of everything that is happening inside your grid to which you can subscribe and respond as appropriate via the Adaptable Api.

There is a full list in the [Api Developer Documentation](https://api.adaptableblotter.com/interfaces/_src_api_eventapi_.eventapi.html).

These events include `AdaptableReady` which fires when the Grid is fully loaded and ready to be used.

In addition the Audit Log fires events whenever User State or underlying data changes. You can listen to these events by setting up Audit Log.

Full details of the Audit Log events can be found in the AuditEventAPI.
 
## Notifications & Alerts
Another way of informing the user of something important is via Message Alerts.  There are 4 types of Alerts that you can send:

Info

Success

Warning

Error

Tip
To send an alert, use the Alert API section of the Adaptable API.

Depending on which method (or params) you use, a different alert will be shown.

By default alerts are shown as popups (and in the Alerts toolbar) but you can choose to put them elsewhere.

Tip
If you want to find out when an alert has been triggered, you can subscribe to AdapTable's AlertFired event, which is published whenever an event is fired (see Event API).

Note
Users are able to create their own alert definitions using the Alerts unction, which will trigger alerts whenever the rule is met.

Additionally, users can also create their own Reminders which are similar to Alerts but the message is hard-coded and they are sent not when something changes but according to a Schedule set by the User when creating the Reminder. (This schedule can be one-time only or a recurring date).


 
## System Status
AdapTable provides 2 ways that, at runtime, you can keep your users updated with vital information about the system.

AdapTable offers you the ability to set a 'System Status message' that you can use to provide information about the state of the application.  

The System Status message can be viewed in the System Status toobar, System Status tool panel or via the System Status button in the Home Toolbar (the first button by default).

When activated, it has 4 states each represented by an associated colour: "Blue" (info), "Red" (info), "Amber" (warning) and "Green" (success).  

Clicking on the button will show an alert that will display the custom message that you send.

You can set the messages through the System Status section of Predefined Config, and you can change the Status at any time through the System Status API section of the Adaptable API.
 
## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/adaptablestate) to see a number of state-related demos

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
