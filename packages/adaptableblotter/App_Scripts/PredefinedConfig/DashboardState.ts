import { RunTimeState } from './RunTimeState';
export interface DashboardState extends RunTimeState {
  AvailableToolbars?: string[];
  VisibleToolbars?: string[];
  VisibleButtons?: string[];
  DashboardVisibility?: 'Minimised' | 'Visible' | 'Hidden';
  ShowSystemStatusButton?: boolean;
  ShowGridInfoButton?: boolean;
  ShowFunctionsDropdown?: boolean;
  ShowColumnsDropdown?: boolean;
  ShowToolbarsDropdown?: boolean;
  HomeToolbarTitle?: string;
  ApplicationToolbarTitle?: string;
  MinimisedHomeToolbarButtonVariant?: 'text' | 'outlined' | 'raised' | 'unelevated';
}

/*
AvailableToolbars

string array

Which function toolbars are available to users. This includes both those which are visible at startup (see VisibleToolbars property below) and those which are hidden but available in the Dashboard Popup to be made visible).

If this property is set, then any function toolbar not listed cannot be seen or used.

If this property is not set, then all function toolbars are available.

See table below for a list of valid values.

VisibleToolbars

string array

Which function toolbars are visible at startup. The order of this collection is the order in which they will appear from left to right. 

See table below for a list of valid values.

VisibleButtons

string array

Which function buttons are visible in the Home Toolbar at startup. Choose the function buttons that make most sense to your users.

Must be a valid value (the list is in the Appendix).

DashboardVisibility

string

Sets the visibility of the Dashboard

Valid values are Visible (default) Hidden or Minimised.

ShowSystemStatusButton

boolean

Whether the coloured System Status button is included in the Home Toolbar (its used for showing system health messages sent from a server).

ShowFunctionsDropdown

boolean

Whether to show the Functions dropdown (true by default).

The Functions dropdown is situated on the left hand side of the Home Toolbar and lists all the functions available to the user.

ShowColumnsDropdown

boolean

Whether to show the Columns dropdown (true by default).

The Columns dropdown is situated on the right hand side of the Home Toolbar and lists all the columns in the grid.

HomeToolbarTitle

string

Sets the title of the Home Toolbar.  

If nothing is set (default is blank), the value of the blotterId property in IAdaptableBlotterOptions will be used instead.

ApplicationToolbarTitle

string

Sets the title of the Application Toolbar.

Note
The Application Toolbar is an empty toolbar designed for letting you host your own elements, buttons and controls.



   * How the button will appear.
   *
   * Options are:
   *
   * -'text' (just the caption)
   *
   * -'outlined' (with a border)
   *
   * -'raised' (the button will be raised)
   *
   * -'unelevated'(the button will appear in the primary colour of the theme - primarily used for non light themes)
   *
   * **Default Value: 'outlined'**
   */
