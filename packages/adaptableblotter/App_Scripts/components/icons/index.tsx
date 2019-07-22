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
import Info from './info';
import List from './list';
import Edit from './edit';
import ViewColumns from './view-columns';
import Home from './home';
import Justify from './justify';
import Err from './error';
import Build from './build';
import Warning from './warning';
import ConditionalStyle from './conditional-style';
import Dashboard from './dashboard';
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

export default {
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'triangle-up': TriangleUp,
  'arrow-down': ArrowDown,
  'triangle-down': TriangleDown,
  'arrow-left': ArrowLeft,
  'color-drop': ColorDrop,
  'check-circle': CheckCircle,
  'view-columns': ViewColumns,
  'conditional-style': ConditionalStyle,
  list: List,
  delete: Delete,
  build: Build,
  save: Save,
  trash: Delete,
  refresh: Refresh,
  error: Err,
  'fast-forward': FastForward,
  'fast-backward': FastBackward,
  warning: Warning,
  justify: Justify,
  check: Check,
  plus: Plus,
  calendar: Calendar,
  home: Home,
  'sort-asc': SortAsc,
  'sort-desc': SortDesc,
  dashboard: Dashboard,
  edit: Edit,
  clear: Clear,
  info: Info,
  add: Plus,
} as { [key: string]: ReactNode };
