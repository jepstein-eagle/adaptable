import { ContainerOptions } from './ContainerOptions';
import { AuditOptions } from './AuditOptions';
import { ConfigServerOptions } from './ConfigServerOptions';
import { LayoutOptions } from './LayoutOptions';
import { FilterOptions } from './FilterOptions';
import { QueryOptions } from './QueryOptions';
import { GeneralOptions } from './GeneralOptions';
import { ChartOptions } from './ChartOptions';
import { PredefinedConfig } from '../PredefinedConfig/PredefinedConfig';
import { AdvancedOptions } from './AdvancedOptions';
import { PartnerOptions } from './PartnerOptions';

/**
 * AdaptableBlotterOptions is the class injected into the Adaptable Blotter at startup.
 *
 * **This forms the only parameter requried by the Adaptable Blotter constructor.**
 *
 * AdaptableBlotterOptions provides all the layout, DataGrid, config and other information required to ensure a full, rich user experience.
 *
 * The AdaptableBlotterOptions class contains a few *normal* properties of which 2 (*vendorGrid* and *primaryKey*) are mandatory - and a number of *xxxOptions* properties where the type is itself a collection of related properties.
 *
 * Typically users will ony populate a few of the properties in AdaptableBlotterOptions, and only a few properties in each class.
 *
 * Any property that is not supplied by the user when populating the object, will use the default value (which is listed here for each property).
 */
export interface AdaptableBlotterOptions {
  /**
   * **MANDATORY property**
   *
   * This is the underlying vendor grid or grid object which the Adaptable Blotter will interact with.
   *
   * Depending on the vendor it is either a Grid or an Options object.
   *
   * The vendor Grid should contain all the column definitions and data sources required.
   *
   * Note: if you are using the *React Wrapper* or the *Angular Wrapper* then you do **not** need to populate this property (as *gridOptions* is a separate parameter).
   *
   * **Default value: N/A**
   */
  vendorGrid?: any;

  /**
   * **MANDATORY property**
   *
   * The name of unique column in the grid
   *
   * Required for cell identification purpose when using Audit and other related functions.
   *
   * Note: The column does not need to be visible but it does need to exist in the grid's data source.
   *
   * **Default value: N/A**
   */
  primaryKey: string;

  /**
   * Identifier for this instance of the Adaptable Blotter
   *
   * Useful if Audit Log is turned on or you are using multiple Blotters
   *
   * **Note** it cannot contain a '.' (as this value is used to name styles which raises issues if it contains a full stop).
   *
   * The value provided here is also that used to name the *Home Toolbar* (the first toolbar that appears in the Dashboard).
   *
   * **Default value: adaptable_blotter_id**
   */
  blotterId?: string;

  /**
   * The name of the current user of the Adaptable Blotter
   *
   * Strongly recommended to be set if using Config Server
   *
   * Also used in Audit Log to identify the current user who has made edits or changed state.
   *
   * **Default value: anonymous**
   */
  userName?: string;

  /**
   * User State (a.ka. 'Predefined Configu) set at design-time and shipped with the Blotter for first use.
   *
   * Contains a mixture of objects and properties.
   *
   * Only used when Config Server is not enabled.
   *
   * Can be either an *PredefinedConfig* object or a url to the file which contains the config.
   *
   * See full details at [Predefined Configuration](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)
   *
   * **Default value: null**
   */
  predefinedConfig?: PredefinedConfig | string;

  /**
   * **This property is deprecated.  It is no longer used or required; licencing by key was removed in version 5**
   */
  licenceKey?: string;

  /**
   * Options for setting the  *Div elements* in which the Adaptable Blotter and underlying grid are placed.
   *
   * Also allows you to set where popups appear relative to the page and where charts are displayed.
   */
  containerOptions?: ContainerOptions;

  /**
   * Options for mananging the **Audit Log**.
   *
   * Depending on the options you set audit messages will send details of actions in the Blotter to an Audit destination.
   *
   * You can choose to listen to any mixture of Audits for: **CellEdit**, **TickingDataChange**, **FunctionEvent**, **UserStateChange** and **InternalStateChange**.
   *
   * You additionally choose to send each audit message (which is packaged as a simple JSON object) to any mixture of: **Http Channel**, **Console**, **Alert** or **Event**.
   *
   * If you select HttpChannel, you can subsequently see these message using reporting software such as the Elastic Stack.
   */
  auditOptions?: AuditOptions;

  /**
   * Options for setting Config Server.
   *
   * This feature allows for storing user state remotely (as opposed to in local storage, which is the default).
   */
  configServerOptions?: ConfigServerOptions;

  /**
   * Options for running queries (or Expressions) in the Adaptable Blotter.
   *
   * Lets you specify how (and how many) values are returned when doing a column lookup, how to deal with case and what is in the Query.
   *
   * Also includes a callback function allowing devs to populate column lookups dynamically.
   */
  queryOptions?: QueryOptions;

  /**
   * Options related to  Layouts (ie. saveable views of column order, visibility and sort).
   *
   * Includes properties for whether to include vendor state in the Layout (e.g. Column Grouping) and whether layouts shoudl save automatically on clicking save.
   */
  layoutOptions?: LayoutOptions;

  /**
   * Related to creating and managing filters in the Adaptable Blotter.
   *
   * Includes options concerning whetehr to use the Adaptable Blotter filters (or those provided by the vendor grid).
   *
   * Also contains options to set if, how and when the Grid should repaint and refilter after user data edits and ticking data edits.
   */
  filterOptions?: FilterOptions;

  /**
   * Options to manage the Adaptable Blotter charting.
   *
   * Primarily concerned with how and where charts appear.
   */
  chartOptions?: ChartOptions;

  /**
   * General options to manage the Adaptable Blotter.
   *
   * Essentially those options that didn't fit into of the specific categories.
   *
   * Includes options for managing Server Searching, themes and how to manage Primary Keys.
   */
  generalOptions?: GeneralOptions;

  /**
   * A set of advanced options for the Adaptable Blotter.
   *
   * The properties in this section are used for more advanced scenarios.
   *
   * Currently it contains properties for managing fumctions which developers provide (that cannot be stored in the 'normal' way with JSON).
   */
  advancedOptions?: AdvancedOptions;

  partnerOptions?: PartnerOptions;
}
