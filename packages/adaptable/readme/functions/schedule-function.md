# Schedule (AdaptableFunction)

The Schedule([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Schedule`) Function 'wraps' all the AdaptableFunctions that include scheduling functionality (i.e. Reminders, Export and ipushpull).

As a result there is no Schedule object in the Adaptable State: instead the Schedule Popup lists all Schedules currently existing in other objects in the Adaptable State together with options to create / edit / delete them.  

Likewise when starting the wizard, the user will access the Wizard of the object for which the Schedule is being created.

## UI Elements
Schedule includes the following UI Elements:

- **Popup** - Shows a list of any existing Reports, Reminders (and other Adaptable Objects) which have attached schedules.  Each row contains an edit button to start the relevant wizard.  Plus an *Add* button to start the Wizard for the type of Schedule required.

## Entitlements
Schedule supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can I create Schedules in Adaptable State**

Yes, but not in the Schedule section of Adaptable State (as it doesn't exist); instead create the Schedules in the relevant property sections of the objects creating the Schedules (e.g. Export, Reminder etc.)

### Further Information

- [Schedule Demo](https://demo.adaptabletools.com/alertsmessages/aggridschedulesdemo)

- [Schedule Api](https://api.adaptabletools.com/interfaces/_src_api_scheduleapi_.scheduleapi.html)

- [Reminder State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_reminderstate_.reminderstate.html)

- [Export State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_exportstate_.exportstate.html)