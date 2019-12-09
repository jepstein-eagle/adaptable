import { AdaptableBlotterObject } from './Common/AdaptableBlotterObject';
import { RunTimeState } from './RunTimeState';
import { ButtonStyle } from './Common/ButtonStyle';

/**
 * The Predefined Configuration for the Application function
 *
 * The Application function is designed to allow developers to provide the Adaptable Blotter with appliation-specific data and UI elements.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/dashboard/aggriddashboardapplicationtoolbardemo/) | [API](_api_applicationapi_.applicationapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743092-Dashboard-FAQ) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
 *
 * **Application Toolbar**
 *
 * The Application function provides an **deliberately empty toolbar** (called *Application*) which users can leverage and populate with their own content.
 *
 * It contains 2 divs (to cater for 2 different scenarios):
 *
 * - a div for you to **render any content that you want**; its your responsibilty to make sure that the div is populated and uses the correct styles.
 *
 * - a div which will **display any buttons that you provide** via the *ApplicationToolbarButtons* property of the Application state (see below).
 *
 *
 * **Rendering Bespoke Content**
 *
 * The Adaptable Blotter provides the [applicationAPI](_api_applicationapi_.applicationapi.html) **getApplicationToolbarContentsDiv** method that returns the name of the Div in which you should render the contents.
 *
 * You can listen to the **ToolbarVisibilityChanged** event published by the Adaptable Blotter which provides the name of relevant toolbar and its new visibility; if its the Application Toolbar then render as required.
 *
 * The list of potential values for the Toolbar name are: "AdvancedSearch", "Alert", "Application", "BulkUpdate", "CellSummary", "Chart", "ColumnFilter", "DataSource", "Export", "Layout", "SmartEdit", "QuickSearch" and "Theme"
 *
 * **Application Rendering Example** (Using React)
 *
 *  ```ts
 * blotterApi.eventApi.on('ToolbarVisibilityChanged',
 *  (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => {
 * if (
 *   toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'Application' &&
 *   toolbarVisibilityChangedEventArgs.data[0].id.visibility == 'Visible'
 * ) {
 *  let toolbarContents: any = (
 *      <div style={{ display: 'flex' }}>
 *       <button
 *          className="ab-SimpleButton ab-SimpleButton--variant-outlined"
 *          onClick={onNewTradeClicked}
 *          style={{ marginRight: '3px' }}
 *        >
 *        Create New Trade
 *        </button>
 *        <select className="ab-Dropdown" style={{ marginRight: '3px' }}>
 *          <option>Book 1</option>
 *          <option>Book 2</option>
 *          <option>Book 3</option>
 *        </select>
 *      </div>
 *    );
 *
 *
 *  ReactDOM.render(
 *    toolbarContents,
 *    blotterApi.applicationApi.getApplicationToolbarContentsDiv()
 *    );
 *  }
 * });
 *
 *  ......
 *
 * function onNewTradeClicked() {
 *    // react as required...
 *  }
 * ```
 *
 * **Providing Buttons Through Predefined Config**
 *
 * In the Application State you provide details of the buttons to appear in the Application toolbar.
 *
 * When one of these buttons is clicked the **ApplicationToolbarButtonClicked** event will fire providing details of the button clicked so you can react as necessary.
 *
 * Note: in the intial implementation you can only provide a button name and caption (text that is displayed), but in future releases you will be able to provide images and also to control the rendering and other aspects of these buttons.
 *
 * **Application Button Predefined Config Example**
 *
 *  ```ts
 * export default {
 * Application: {
 *  ApplicationToolbarButtons:[
 *    {
 *      Name: 'btnNewTrade',
 *      Caption: 'New Trade',
 *      ButtonStyle: {
          Variant: 'text',
          Tone: 'success',
        },
 *    },
 *    {
 *      Name: 'btnRefreshGrid',
 *      Caption: 'Refresh Grid',
 *       ButtonStyle: {
          Variant: 'raised',
          Tone: 'accent',
        },
 *    },
 *    ],
 *  }
 * } as PredefinedConfig;
 *
 *  ......
 *
 *  blotterApi.eventApi.on('ApplicationToolbarButtonClicked', applicationToolbarButtonClickedEventArgs)  => {
 *      // respond as appropriate - the button argument is the ApplicationToolbarButton we provided in the state
 *  });
 * ```
 *
 * **The Application Data Entries**
 *
 * The Application State also provides an ApplicationDataEntries array.
 *
 * This enables you to provide the Adaptable Blotter with your own data (which needs to be provided in key / value form) that the Adaptable Blotter will then store in its State.
 *
 *  **Because these entries are stored as JSON, the value must be something that is capable of being 'stringified'**
 *
 * **Application Data Entries Predefined Config Example**
 *
 *  ```ts
 * export default {
 * Application: {
 *  ApplicationDataEntries:[
 *    {
 *      Key: 'Name',
 *      Value: 'John Smith',
 *    },
 *    {
 *      Key: 'Employee Number',
 *      Value: 20283728,
 *    },
 *    {
 *      Key: 'Joined Date',
 *      Value: new Date(2017, 13, 7),
 *    },
 *    {
 *      Key: 'Super User',
 *      Value: false,
 *    },
 *    ],
 *  }
 * } as PredefinedConfig;
 * ```
 *
 **/
export interface ApplicationState extends RunTimeState {
  /**
   * An array of Application Toolbar Buttons - each of which is rendered as a button in the Application Toolbar.
   *
   * When one of these buttons is clicked the on('ApplicationToolbarButtonClicked') event is fired.
   */
  ApplicationToolbarButtons?: ApplicationToolbarButton[];

  /**
   * An array of Application Data Entries (essentially Key / Value pairs) enabling you to provide the Adaptable Blotter with your own data.
   *
   * That data will then be persisted by Adaptable Blotter in its own State.
   */
  ApplicationDataEntries?: ApplicationDataEntry[];

  /**
   * Sets the title of the Application Toolbar
   *
   * Note:  Use this property instead of the deprecrated `ApplicationToolbarTitle` property in Dashboard State.
   *
   * **Default Value: 'Application**
   */
  ApplicationToolbarTitle?: string;
}

/**
 * Defines an Application Toolbar Button that is specified at design time by users and rendered dynamically by the Adaptable Blotter at run-time.
 *
 * It is hosted in the Application Toolbar
 *
 * When an Application Toolbar Button is clicked, the Adaptable Blotter will fire an *ApplicationToolbarButtonClicked* event to which you can subscribe via the Event API.
 */
export interface ApplicationToolbarButton extends AdaptableBlotterObject {
  /**
   * The name of the button
   *
   * **This should be a name that is valid as an HTML element**
   */
  Name: string;

  /**
   * What text will appear on the button
   *
   * *Currently you cannot provide an image for this button but that will be made available in a forthcoming release*
   */
  Caption: string;

  /**
   * The style to use for the Application Button.
   *
   * Includes 'Variant' and 'Tone'
   */
  ButtonStyle?: ButtonStyle;
}

/**
 * Defines a simple Key / Value pair object.
 *
 * This can be used to store any inforrmation that is particular to your application in the Adaptable Blotter state.
 *
 * **note: because this is stored as JSON the value must be something that is capable of being 'stringified'**
 */
export interface ApplicationDataEntry {
  /**
   * The key of the Key / Value pair - always stored as a string
   */
  Key: string;

  /**
   * The actual piece of data or object being stored.
   *
   * The only limitation is that it needs to be something that can be stringified as it will be converted to JSON.
   */
  Value: any;
}
