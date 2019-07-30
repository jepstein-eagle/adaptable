import * as React from 'react';
import { ReactNode } from 'react';

import ArrowRight from './arrow-right';
import ArrowDown from './arrow-down';
import ArrowUp from './arrow-up';
import ArrowLeft from './arrow-left';
import TriangleUp from './triangle-up';
import TriangleDown from './triangle-down';
import Check from './check';
import Plus from './plus';
import Clear from './clear';
import Search from './search';
import Info from './info';
import Alert from './alert';
import List from './list';
import Edit from './edit';
import ViewColumns from './view-columns';
import Home from './home';
import Justify from './justify';
import Err from './error';
import Export from './export';
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
import BarChart from './bar-chart';
import laptop from './laptop';
import update from './update';
import ImportExport from './import-export';
import { ReactComponentLike } from 'prop-types';
import phoneSetup from './phone-setup';
import viewModule from './view-module';
import flag from './flag';
import tableChart from './table-chart';
import filterList from './filter-list';
import columnInfo from './column-info';
import swapVert from './swap-vert';
import dataSource from './data-source';
import flashOn from './flash-on';
import colorLens from './color-lens';
import shortText from './short-text';
import comment from './comment';
import apps from './apps';
import assignment from './assignment';
import linearScale from './linear-scale';
import pieChart from './pie-chart';
import addCircle from './add-circle';
import pageView from './page-view';
import alarm from './alarm';
import link from './link';
import person from './person';
import alignJustify from './align-justify';
import colorFill from './color-fill';

const allIcons = {
  assignment,
  'linear-scale': linearScale,
  'pie-chart': pieChart,
  'add-circle': addCircle,
  'page-view': pageView,
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
  'bar-chart': BarChart,
  'color-drop': ColorDrop,
  'column-info': columnInfo,
  'check-circle': CheckCircle,
  'view-columns': ViewColumns,
  'conditional-style': ConditionalStyle,
  apps,
  'filter-list': filterList,
  comment,
  list: List,
  undo: Undo,
  'table-chart': tableChart,
  flag,
  update,
  'phone-setup': phoneSetup,
  'view-module': viewModule,
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
  alert: Alert,
  laptop,
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
  'data-source': dataSource,
  dashboard: Dashboard,
  'align-justify': alignJustify,
  edit: Edit,
  clear: Clear,
  'import-export': ImportExport,
  'color-fill': colorFill,
  info: Info,
  'info-sign': Info,
  add: Plus,
  'flash-on': flashOn,
  flash: flashOn,
  export: Export,
  search: Search,
} as { [key: string]: ReactNode };

export const Icon = ({ name, ...props }: { name: string; props?: any }) => {
  const IconCmp = (allIcons[name] || null) as ReactComponentLike;

  if (!IconCmp) {
    console.warn('NO icon found for' + name);
  }

  return <IconCmp {...props} />;
};

export default allIcons;
