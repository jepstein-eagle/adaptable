import { DesignTimeState } from './DesignTimeState';

/**
 * The Predefined Configuration for the System Status function.
 *
 * The System Status function allows you to display a `StatusMessage` to the user with important information.
 *
 * Each message is associated with a `StatusType` that has a default colour (though you can change this through CSS Variables when you create a custom theme).
 *
 * The default Message Types are:
 *
 * - 'Info' (Blue)
 *
 * - 'Success' (Green)
 *
 * - 'Warning' (Amber)
 *
 * - 'Error' (Red)
 *
 * In this System Status section of Predefined Config you can also set a `DefaultStatusMessage` and `DefaultStatusType` to display when there is nothing specific to show.
 *
 * The Adaptable will ensure that this Default Message is displayed any time there is no actual Status Message to show.
 *
 * You can display the System Status message (or Default Message) in 4 ways:
 *
 * - As an Alert (which will popup and also appear in the Alert Toolbar and ToolPanel)
 *
 * - Via the SystemStatus Button in the Home Toolbar which will show an appropriate icon - when the Button is clicked the System Status Popup will display showing the message and any further information.  Set visibility via the `ShowSystemStatusButton` in [Dashboard State](_predefinedconfig_dashboardstate_.dashboardstate.html#showsystemstatusbutton).
 *
 * - In the System Status Toolbar
 *
 * - In the System Status ToolPanel
 *
 * **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/alertsmessages/aggridsystemstatusdemo/) | [System Status API](_api_systemstatusapi_.systemstatusapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895931-Alert-Functions-FAQ) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002754957-Run-Time-Access)
 *
 * **System Status Predefined Config Example**
 *
 * ```ts
 * export default {
 * SystemStatus: {
 *    ShowAlert: false,
 *    DefaultStatusMessage: 'Server is running fine.',
 *    DefaultStatusType: 'Info',
 *    StatusMessage: 'Please check you have sent End of Day report.',
 *    StatusType: 'Warning',
 *  },
 * } as PredefinedConfig;
 * ```
 * In this example we have set an initial Message and Type (of Warning) and also provided a Default Message and Type to be used when the message is cleared / or there is no explicit System Status message.
 *
 */
export interface SystemStatusState extends DesignTimeState {
  /**
   * A default status message to show.
   *
   * If this is set, then it is used whenever there is not an explicit value for the `StatusMessage` property.
   *
   * **Default Value**: [empty string]
   */
  DefaultStatusMessage?: string;

  /**
   * A default status type to use.
   *
   * If this is set, then it is used whenever there is not an explicit value for the `StatusType` property.
   *
   * **Default Value**: [undefined]
   */
  DefaultStatusType?: 'Info' | 'Success' | 'Warning' | 'Error';

  /**
   * The System Status message to show.
   *
   * This is shown in the System Status Toolbar (and tool panel).
   *
   * **Default Value**: [empty string]
   */
  StatusMessage?: string;

  /**
   * What the type of Status Message is.
   *
   * Each type is colour coded according to variables set in the theme.
   *
   * By default the associated colours are: Info - blue; Success- green; Warning: amber; Error: red; though this can be changed if you provide a custom theme.
   *
   * **Default Value**: [undefined]
   */
  StatusType?: 'Info' | 'Success' | 'Warning' | 'Error';

  /**
   * Any further information to be included with the System Status message.
   *
   * Any 'Further Information' is displayed when the System Status popup is opened but it is not displayed in the System Status toolbar.
   *
   * **Default Value**: [empty string]
   */
  StatusFurtherInformation?: string;

  /**
   * Whether to show an Alert when the System Status changes.
   *
   * If true whenever a System Status message is sent, an Alert will popup (and also be inserted in the Alert toolbar and tool panel).
   *
   * **Default Value: false**
   */
  ShowAlert?: boolean;
}
