# System Status (AdaptableFunction)

The System Status ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `SystemStatus`) Function is designed to help keep End Users updated with vital information about the system.

It allows you to display a `StatusMessage` to the user containing important information.

### Status Types
Each message is associated with a `StatusType` that has a default colour (though this can be changed through CSS Variables).

The 4 Status Types (together with default colours) are:

- Info' (Blue)

- 'Success' (Green)

- 'Warning' (Amber)

- 'Error' (Red)

### Default Message and Status Type
Developers can provide values for the `DefaultStatusMessage` and `DefaultStatusType` properties.

These are the Message and the Status Type, respectively, which will be used if there is no Message or Status Type.

Adaptable will ensure that this Default Message is displayed any time there is no actual Status Message to show.


## UI Elements
System Status includes the following UI Elements:

- **Popup** - Shows the current System Status message and description, together with a clear button.  The message is coloured in line with the Message Type.

- **Toolbar** - Same as Popup above.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu Item** - `Show System Status` Menu Item opens the System Status popup.

- **Context Menu Item** - `Show System Status` Menu Item opens the System Status popup.

> In addition the Status System Function Button in the Dashboard will display with the colour associated with the current Status Type.

## Entitlements
System Status supports these Entitlement Rules:

- **Full**: System Status messages can be read and cleared

- **Hidden**: System Status messages can be read and cleared

- **ReadOnly**: n/a


## FAQ

**Can I choose where System Status messages are displayed (in the same way as Alerts)?**

To a limited extent.  The `ShowAlert` allows you to specify whether an Alert will be fired when the System Status messsage changes (it will always display in the Toolbar and ToolPanel).

### Further Information

- [System Status State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_systemstatusstate_.systemstatusstate.html)

- [System Status Api](https://api.adaptabletools.com/interfaces/_src_api_systemstatusapi_.systemstatusapi.html)

- [System Status Demo](https://demo.adaptabletools.com/alertsmessages/aggridsystemstatusdemo)

- [Run-Time Access Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-runtime-access-guide.md)



