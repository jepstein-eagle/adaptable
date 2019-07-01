import { ReactNode } from 'react';

import ArrowRight from './arrow-right';
import ArrowDown from './arrow-down';
import ArrowUp from './arrow-up';
import ArrowLeft from './arrow-left';
import Check from './check';
import Plus from './plus';
import Clear from './clear';
import Info from './info';
import List from './list';
import Edit from './edit';
import Home from './home';
import Justify from './justify';
import Err from './error';
import Warning from './warning';
import Dashboard from './dashboard';
import ColorDrop from './color-drop';
import CheckCircle from './check-circle';

export default {
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'color-drop': ColorDrop,
  'check-circle': CheckCircle,
  list: List,
  error: Err,
  warning: Warning,
  justify: Justify,
  check: Check,
  plus: Plus,
  home: Home,
  dashboard: Dashboard,
  edit: Edit,
  clear: Clear,
  info: Info,
  add: Plus,
} as { [key: string]: ReactNode };
