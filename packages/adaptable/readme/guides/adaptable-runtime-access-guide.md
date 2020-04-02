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

There is a full list in the [Event Section of Api Developer Documentation](https://api.adaptableblotter.com/interfaces/_src_api_eventapi_.eventapi.html).

These events include `AdaptableReady` which fires when the Grid is fully loaded and ready to be used.

In addition the [Audit Log](https://api.adaptableblotter.com/interfaces/_src_adaptableoptions_auditoptions_.auditoptions.html) can be configured to fire an event whenever User State or underlying data changes. 

Full details of the Audit Log events can be found in the [Audit Event Section of Api Developer Documentation](https://api.adaptableblotter.com/interfaces/_src_api_auditeventapi_.auditeventapi.html).
 
## Notifications & Alerts
End Users can be immediately informed when something important happens through Message Alerts.

These are normally triggered as the result of data changes (e.g. if Column X change > 10%) but the [Alert Api](https://api.adaptableblotter.com/interfaces/_src_api_alertapi_.alertapi.html) can be used to send them at other times too.

There are 4 types of Alerts that can be sent:

- Info

- Success

- Warning

- Error

There are a number of different [Alert properties](https://api.adaptableblotter.com/interfaces/_src_predefinedconfig_alertstate_.alertproperties.html) available - allowing you to show Alerts as popups, or in the Alerts toolbar and tool panel, to colour or jumpt to cells that triggered the Alert etc.  See [Alert State](https://api.adaptableblotter.com/interfaces/_src_predefinedconfig_alertstate_.alertstate.html) for full details.

> To find out when an alert has been triggered, subscribe to AdapTable's [AlertFired event](https://api.adaptableblotter.com/interfaces/_src_api_eventapi_.eventapi.html).

End Users can create their own Alert definitions at run-time using the [Alerts function](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/alert_function.md), which will trigger alerts whenever the rule they create is met.

> Additionally, End Users can also create their own Reminders which are similar to Alerts but the message is hard-coded and they are sent not when something changes but according to a Schedule set by the User when creating the Reminder. (This schedule can be one-time only or a recurring date).


## System Status
AdapTable provides they [System Status function](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/system_status_function.md) function to help keep End Users updated with vital information about the system.

This includes a 'System Status Message' and colour-coded 'System Status Type' used to provide urgent information about the state and health of the application and sent via the [System Status Api](https://api.adaptableblotter.com/interfaces/_src_api_systemstatusapi_.systemstatusapi.html).  

The System Status message can be viewed in the System Status toobar, System Status tool panel or via the System Status button in the Home Toolbar (the first button by default).
 
## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/adaptablestate) to see a number of state-related demos

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
