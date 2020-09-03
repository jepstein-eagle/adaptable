# Schedule (AdaptableFunction)

The Schedule Function allows certain actions to be performed at a given point in time - either as a one-off date or a repeated activity.

The Schedule function 'wraps' all the AdaptableFunctions that include scheduling functionality in one place.  

As a result, when starting the Schedule wizard, the user will access the Wizard of the object for which the Schedule is being created - but the end object will be stored in the Schedule State.

> In older versions of AdapTable Schedules were stored in the relevant Function's State, but in Version 7 these were centralised to all be stored in [Schedule State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_schedulestate_.schedulestate.html).

## Functions with Schedules

The following Functions use Schedules:

- Export

- Reminder

- ipushpull (via the ipushpull Plugin)

- Glue42 (via the Glue42 Plugin)

- OpenFin (via the OpenFin Plugin)


## UI Elements

Schedule includes the following UI Elements:

- **Popup** - Shows a list of any existing Reports, Reminders (and other Adaptable Objects) which have attached schedules.  Each row contains an edit button to start the relevant wizard.  Plus an *Add* button to start the Wizard for the type of Schedule required.

## Entitlements

Schedule supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

#### Can I create Schedules in Adaptable State

Yes.  In previous versions of AdapTable the Schedules were stored in the State section relating to that Function.  

But this became unwieldy and difficult to manage, so in Version 7 of AdapTable this was changed so that all Schedules are stored in [Schedule State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_schedulestate_.schedulestate.html).

### Further Information

- [Schedule Demo](https://demo.adaptabletools.com/alertsmessages/aggridschedulesdemo)

- [Schedule Api](https://api.adaptabletools.com/interfaces/_src_api_scheduleapi_.scheduleapi.html)

- [Schedule State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_schedulestate_.schedulestate.html)
