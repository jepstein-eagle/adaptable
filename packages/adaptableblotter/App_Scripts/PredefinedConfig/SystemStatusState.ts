import { DesignTimeState } from './DesignTimeState';

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
