# Reminder (AdaptableFunction)

The Reminder([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Reminder`) Function faciliates the creation of scheduled reminders so that users don't forget to do important grid actions

A Reminder is essentially an Alert but one that runs according to a Schedule. So, unlike Alerts, it is not trigged by a data (or other) changes, but according to a predefiend date schedule.

> The Schedule can be either a one-off date, or it can be a Recurring event (e.g. every Monday at 8am, or every day at 17:00).

The Reminder contains 3 elements

- Header (optional)

- Message

- Message Type (Info, Success, Warning, Error)

AdapTable fires an event each time an alert is triggered and this will include if it was triggered by a Reminder so it will be visible in the Alert Toolbar and Tool Panel.

**As of Version 7 of AdapTable the Reminder section has been removed from Adaptable State, as all Schedules are now stored in the [Schedule State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_schedulestate_.schedulestate.html) section instead**

## UI Elements
Reminder includes the following UI Elements:

- **Popup** - Shows a list of existing Reminders with *Edit* and *Delete* buttons.  Plus an *Add* button to start the Reminder Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Reminders.

## Entitlements
Reminder supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User will see alerts triggered by Reminders that were listed in Predefined Config but they cannot edit or delete them, nor add others.

## FAQ

**Why is there no Reminder section of Adaptable State any more?**

This was removed in Version 7 of AdapTable when all Schedules were stored in [Schedule State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_schedulestate_.schedulestate.html) instead.

### Further Information

- [Reminder Api](https://api.adaptabletools.com/interfaces/_src_api_reminderapi_.reminderapi.html)

- [Reminder Demo](https://demo.adaptabletools.com/alertsmessages/aggridreminderdemo)

- [Schedule State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_schedulestate_.schedulestate.html)

- [Schedule Demo](https://demo.adaptabletools.com/alertsmessages/aggridschedulesdemo)
