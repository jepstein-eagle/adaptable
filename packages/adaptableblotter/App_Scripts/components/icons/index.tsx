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

const allIcons = {
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'triangle-up': TriangleUp,
  'arrow-down': ArrowDown,
  'triangle-down': TriangleDown,
  'arrow-left': ArrowLeft,
  'bar-chart': BarChart,
  'color-drop': ColorDrop,
  'check-circle': CheckCircle,
  'view-columns': ViewColumns,
  'conditional-style': ConditionalStyle,
  list: List,
  undo: Undo,
  update,
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
  dashboard: Dashboard,
  edit: Edit,
  clear: Clear,
  'import-export': ImportExport,
  info: Info,
  'info-sign': Info,
  add: Plus,
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
