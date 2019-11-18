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
import ViewColumns from './view-columns';
import Home from './home';
import Justify from './justify';
import Err from './error';
import Export from './export';
import SystemUpdate from './system-update';
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
import phoneSetup from './phone-setup';
import CellSummary from './cell-summary';
import flag from './flag';
import tableChart from './table-chart';
import ColumnFilter from './column-filter';
import columnInfo from './column-info';
import swapVert from './swap-vert';
import DataSource from './data-source';
import flashOn from './flash-on';
import edit from './edit';
import colorLens from './color-lens';
import shortText from './short-text';
import comment from './comment';
import Layout from './layout';
import assignment from './assignment';
import linearScale from './linear-scale';
import pieChart from './pie-chart';
import addCircle from './add-circle';
import QuickSearch from './quick-search';
import alarm from './alarm';
import link from './link';
import person from './person';
import alignJustify from './align-justify';
import Theme from './theme';
import checkBox from './check-box';
import checkBoxOutline from './check-box-outline';
import tabUnselected from './tab-unselected';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';

const allIcons = {
  // toolbars - we have changed these as they are most likely to get used externally
  'advanced-search': AdvancedSearch, // original icon is search
  application: Application, // original icon is   laptop,
  alert: Alert,
  'bulk-update': BulkUpdate, // original icon is update,
  chart: Chart, // original icon is bar-chartexport: Export,
  'cell-summary': CellSummary, // original icon is view-module
  'column-filter': ColumnFilter, // original icon is filter-list
  'data-source': DataSource,
  export: Export,
  layout: Layout, // original icon is apps,
  'quick-search': QuickSearch, // original icon is page-view
  'smart-edit': SmartEdit, // original icon is edit
  theme: Theme, // original icon is color-fill

  assignment,
  'linear-scale': linearScale,
  'pie-chart': pieChart,
  'add-circle': addCircle,
  edit: edit,
  'tab-unselected': tabUnselected,
  'check-box': checkBox,
  'check-box-outline': checkBoxOutline,
  unchecked: checkBoxOutline,
  checked: checkBox,
  alarm,
  person,
  link,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'triangle-up': TriangleUp,
  'arrow-down': ArrowDown,
  'triangle-down': TriangleDown,
  'color-lens': colorLens,
  'short-text': shortText,
  'arrow-left': ArrowLeft,

  'color-drop': ColorDrop,
  'column-info': columnInfo,
  'check-circle': CheckCircle,
  'view-columns': ViewColumns,
  'conditional-style': ConditionalStyle,

  comment,
  list: List,
  undo: Undo,
  'table-chart': tableChart,
  flag,
  'phone-setup': phoneSetup,

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
  calendar: Calendar,
  home: Home,
  'sort-asc': SortAsc,
  'sort-desc': SortDesc,
  'swap-vert': swapVert,

  dashboard: Dashboard,
  'align-justify': alignJustify,

  clear: Clear,
  'import-export': ImportExport,

  'attach-file': AttachFile,
  'system-update': SystemUpdate,
  info: Info,
  'info-sign': Info,
  add: Plus,
  'flash-on': flashOn,
  flash: flashOn,
} as { [key: string]: ReactNode };

Object.keys(allIcons).forEach(name => {
  const ReactCmp = allIcons[name] as ReactComponentLike;
  allIcons[name] = (props: any) => <ReactCmp {...props} name={name} />;
});

export const Icon = ({
  name,
  style,
  ...props
}: {
  style?: React.CSSProperties;
  name: string;
  size?: number;
  props?: React.SVGProps<SVGElement>;
}) => {
  const IconCmp = (allIcons[name] || null) as ReactComponentLike;

  if (!IconCmp) {
    LoggingHelper.LogAdaptableBlotterWarning('NO icon found for ' + name);
    return <svg />;
  }

  return <IconCmp {...props} style={style} name={name} />;
};

export const iconToString = (name: string, props?: any) =>
  ReactDOMServer.renderToString(<Icon name={name} {...props} />);

export default allIcons;
