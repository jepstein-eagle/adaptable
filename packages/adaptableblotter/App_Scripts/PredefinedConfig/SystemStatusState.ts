import { DesignTimeState } from './DesignTimeState';

/**
 * The Predefined Configuration for the System Status function.
 *
 * System Status will display a message sent to the user at run-time, together with a status type.
 *
 * You can display this message in 4 ways:
 *
 * - As an Alert (which will popup and appear in the Alert Toolbar and ToolPanel)
 *
 * - Through the SystemStatus Button which will show an appropriate icon - when the Button is clicked the System Status Popup will display showing the message adn any further information
 *
 * - In the System Status Toolbar
 *
 * - In the System Status ToolPanel
 *
 * You are, additionally, able to provide a Default System Status Message and Status Type which will be used when no specific message has been sent.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/search/aggridadvancedsearchdemo/) | [API](_api_advancedsearchapi_.advancedsearchapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895971-Advanced-Search-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028637652-Advanced-Search-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755137-Search-Functions)
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
 * In this example we have set an initial Message and Type (of Warning) and also set the Default Message and Type to be used when the message is cleared / or there is no explicit System Status message.
 *
 */
export interface SystemStatusState extends DesignTimeState {
  /**
   * A default status message to show.
   *
   * If this is set, then it is used whenever there is not an explicit value for the `StatusMessage` property and it overrides the default message provided by the Adaptable Blotter.
   *
   * If this is not set, then the Adaptable Blotter default message is "All fine".
   */
  DefaultStatusMessage?: string;

  /**
   * A default status type to use.
   *
   * If this is set, then it is used whenever there is not an explicit value for the `StatusType` property and it overrides the default message type provided by the Adaptable Blotter.
   *
   * If this is not set, then the Adaptable Blotter default message type is "Success".
   */
  DefaultStatusType?: 'Info' | 'Success' | 'Warning' | 'Error';

  /**
   * The System Status message to show.
   *
   * This is shown in the System Status Toolbar (and tool panel).
   */
  StatusMessage?: string;

  /**
   * What the type of Status Message is.
   *
   * Each type is colour coded according to variables set in the theme.
   *
   * The defaults are: Info - blue; Success- green; Warning: amber; Error: red.
   */
  StatusType?: 'Info' | 'Success' | 'Warning' | 'Error';

  /**
   * Any further information to be included with the System Status message.
   *
   * Any 'Further Information' is displayed when the System Status popup is opened but it is not displayed in the System Status toolbar.
   */
  StatusFurtherInformation?: string;

  /**
   * Whether to show an Alert when the System Status changes.
   *
   * If true whenever a System Status is sent, an Alert will popup and also be inserted in the Alert toolbar.
   *
   * **Default Value: false**
   */
  ShowAlert?: boolean;
}
