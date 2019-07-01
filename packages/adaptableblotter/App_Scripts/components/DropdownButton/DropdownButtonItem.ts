type DropdownButtonItem = {
  onClick?: (e: React.SyntheticEvent, item: DropdownButtonItem) => any;
  onChange?: (e: React.SyntheticEvent, item: DropdownButtonItem) => any;
  disabled?: boolean;
  clickable?: boolean;
};
export default DropdownButtonItem;
