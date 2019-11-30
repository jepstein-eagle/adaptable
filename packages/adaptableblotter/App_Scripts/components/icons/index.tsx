import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ReactNode } from 'react';

import ArrowRight from './arrow-right';
import ArrowDown from './arrow-down';
import ArrowUp from './arrow-up';
import ArrowLeft from './arrow-left';
import TriangleUp from './triangle-up';
import TriangleDown from './triangle-down';
import Check from './check';
import AttachFile from './attach-file';
import Plus from './plus';
import Clear from './clear';
import AdvancedSearch from './advancedsearch';
import Info from './info';
import Alert from './alert';
import List from './list';
import SmartEdit from './smart-edit';
import ColumnChooser from './column-chooser';
import Home from './home';
import Justify from './justify';
import Err from './error';
import Export from './export';
import SystemUpdate from './updated-row';
import Build from './build';
import Warning from './warning';
import ConditionalStyle from './conditional-style';
import Dashboard from './dashboard';
import Undo from './undo';
import FastForward from './fast-forward';
import FastBackward from './fast-backward';
import SortAsc from './sort-asc';
import SortDesc from './sort-desc';
import Calendar from './calendar';
import Delete from './delete';
import ColorDrop from './color-drop';
import CheckCircle from './check-circle';
import Refresh from './refresh';
import Save from './save';
import Chart from './chart';
import Application from './application';
import BulkUpdate from './bulk-update';
import ImportExport from './import-export';
import { ReactComponentLike } from 'prop-types';
import CalculatedColumn from './calculated-column';
import CellSummary from './cell-summary';
import CellValidation from './cell-validation';
import ColumnCategory from './column-category';
import ColumnFilter from './column-filter';
import ColumnInformation from './column-info';
import CustomSort from './custom-sort';
import SystemStatus from './system-status';
import DataSource from './data-source';
import FlashingCell from './flashing-cell';
import edit from './edit';
import FormatColumn from './format-column';
import FreetextColumn from './freetext-column';
import comment from './comment';
import Layout from './layout';
import StateManagement from './state-management';
import PercentBar from './percent-bar';
import Sparkline from './spark-line';
import PieChart from './pie-chart';
import PlusMinus from './plus-minus';
import QuickSearch from './quick-search';
import Reminder from './reminder';
import Shortcut from './shortcut';
import TeamShare from './team-share';
import UpdatedRow from './updated-row';
import UserFilter from './user-filter';
import alignJustify from './align-justify';
import Theme from './theme';
import checkBox from './check-box';
import checkBoxOutline from './check-box-outline';
import tabUnselected from './tab-unselected';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';

const allIcons = {
  // toolbars
  'advanced-search': AdvancedSearch, // original icon is search
  application: Application, // original icon is   laptop,
  alert: Alert,
  'bulk-update': BulkUpdate, // original icon is update,
  chart: Chart, // original icon is bar-chart
  'cell-summary': CellSummary, // original icon is view-module
  'column-filter': ColumnFilter, // original icon is filter-list
  'data-source': DataSource,
  export: Export,
  layout: Layout, // original icon is apps,
  'quick-search': QuickSearch, // original icon is page-view
  'smart-edit': SmartEdit, // original icon is edit
  theme: Theme, // original icon is color-fill

  // non toolbar strategy images
  'calculated-column': CalculatedColumn, // original icon is phone-setup
  calendar: Calendar,
  'cell-validation': CellValidation, // original icon is flag,
  'column-category': ColumnCategory, // original icon was table-chart
  'column-chooser': ColumnChooser, // original icon was view-columns
  'conditional-style': ConditionalStyle,
  'column-info': ColumnInformation,
  'custom-sort': CustomSort, // was swap-vert
  dashboard: Dashboard,
  'flashing-cell': FlashingCell, // flashOn,
  'format-column': FormatColumn, /// color-lens
  'freetext-column': FreetextColumn, //  short-text
  'percent-bar': PercentBar, // linear-scale
  'spark-line': Sparkline, //    show-chart
  'pie-chart': PieChart,
  'plus-minus': PlusMinus, //add-circle
  reminder: Reminder, // alarm
  shortcut: Shortcut, // link
  'state-management': StateManagement, //   assignment,
  'system-status': SystemStatus, // was traffic
  'team-share': TeamShare, // folder-shared
  'updated-row': UpdatedRow, //   system-update
  'user-filter': UserFilter, // person

  // others
  edit: edit,
  'tab-unselected': tabUnselected,
  'check-box': checkBox,
  'check-box-outline': checkBoxOutline,
  unchecked: checkBoxOutline,
  checked: checkBox,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'triangle-up': TriangleUp,
  'arrow-down': ArrowDown,
  'triangle-down': TriangleDown,
  'arrow-left': ArrowLeft,
  'color-drop': ColorDrop,
  'check-circle': CheckCircle,
  comment,
  list: List,
  undo: Undo,
  delete: Delete,
  build: Build,
  save: Save,
  trash: Delete,
  refresh: Refresh,
  error: Err,
  exclamation: Err,
  'exclamation-sign': Err,
  'fast-forward': FastForward,
  'fast-backward': FastBackward,
  warning: Warning,
  'notification-important': Alert,
  'warning-sign': Warning,
  justify: Justify,
  check: Check,
  ok: Check,
  'ok-sign': Check,
  plus: Plus,
  home: Home,
  'sort-asc': SortAsc,
  'sort-desc': SortDesc,
  'align-justify': alignJustify,
  clear: Clear,
  'import-export': ImportExport,
  'attach-file': AttachFile,
  info: Info,
  'info-sign': Info,
  add: Plus,
} as { [key: string]: ReactNode };

Object.keys(allIcons).forEach(name => {
  const ReactCmp = allIcons[name] as ReactComponentLike;
  allIcons[name] = (props: any) => <ReactCmp {...props} name={name} />;
});

export const Icon = ({
  name,
  style,
  className,
  ...props
}: {
  style?: React.CSSProperties;
  name: string;
  size?: number;
  className?: string;
  props?: React.SVGProps<SVGElement>;
}) => {
  const IconCmp = (allIcons[name] || null) as ReactComponentLike;

  if (!IconCmp) {
    LoggingHelper.LogAdaptableBlotterWarning('NO icon found for ' + name);
    return <svg />;
  }

  return <IconCmp {...props} style={style} name={name} className={className} />;
};

export const iconToString = (name: string, props?: any) =>
  ReactDOMServer.renderToString(<Icon name={name} {...props} />);

export default allIcons;
