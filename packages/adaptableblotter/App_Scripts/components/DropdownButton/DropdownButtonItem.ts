import { ReactNode } from 'react';

type DropdownButtonItem = {
  onClick?: (e: React.SyntheticEvent, item: DropdownButtonItem) => any;
  onChange?: (e: React.SyntheticEvent, item: DropdownButtonItem) => any;
  disabled?: boolean;
  clickable?: boolean;
  label?: ReactNode;
  icon?: ReactNode;
};
export default DropdownButtonItem;
