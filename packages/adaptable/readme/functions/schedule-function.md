# Schedule (AdaptableFunction)

The Schedule([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Schedule`) Function 'wraps' all the AdaptableFunctions that include scheduling functionality (i.e. Reminders, Export and ipushpull).

There is no Schedule object itself: instead the Popup lists all Schedules currently existing in other objects in the Adaptable State.  

Likewise when starting the wizard, the user will access the Wizard of the object for which the Schedule is being created.

As a result the Schedule Function does not store any State directly.


## UI Elements
Schedule includes the following UI Elements:

- **Popup** - Shows a list of any existing Reports, Reminders (and other Adaptable Objects) which have attached schedules.  Each row contains an edit button to start the relevant wizard.  Plus an *Add* button to start the Wizard for the type of Schedule required.

## Entitlements
Schedule supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

To Do

### Further Information

- [Schedule Demo](https://demo.adaptabletools.com/alertsmessages/aggridschedulesdemo)