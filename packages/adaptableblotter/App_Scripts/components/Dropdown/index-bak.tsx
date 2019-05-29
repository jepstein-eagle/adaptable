// import * as React from 'react';

// import ReactSelect from 'react-select';
// import { useState, useLayoutEffect, useRef, useEffect } from 'react';
// import { BoxProps, Box } from 'rebass';
// import join from '../utils/join';
// import useProperty from '../utils/useProperty';

// export type DropdownOption = {
//   label: string;
//   value: string;
// };
// export type DropdownProps = BoxProps &
//   React.HTMLProps<HTMLElement> & {
//     bsSize?: string;
//     bsStyle?: string;

//     autoFocus?: boolean;
//     expanded?: boolean;
//     disabled?: boolean;
//     multiple?: boolean;
//     allowSearch?: boolean;

//     name?: string;
//     options: (DropdownOption | string)[];
//     defaultExpanded?: boolean;
//     showClearButton?: boolean;
//     onCollapse?: () => void | Function;
//     onExpand?: () => void | Function;
//     onSelect?: () => void | Function;
//   };

// const baseClassName = 'ab-Dropdown';

// const Dropdown = (props: DropdownProps) => {
//   let {
//     options,
//     multiple,
//     name,
//     showClearButton,
//     disabled,
//     allowSearch,
//     value: _,
//     onChange: __,
//     ...reactSelectProps
//   } = props;

//   let [value, setValue] = useProperty<any>(props, 'value', undefined, {
//     onChange: props.onChange,
//   });

//   const finalOptions: DropdownOption[] = options.map(
//     (option: DropdownOption | string): DropdownOption => {
//       if (typeof option === 'string') {
//         option = {
//           label: option,
//           value: option,
//         };
//       }

//       if (value === option || value === option.value) {
//         value = option;
//       }

//       return option;
//     }
//   );

//   const onChange = (option: DropdownOption) => {
//     setValue(option ? option.value : option, option);
//   };

//   return (
//     <ReactSelect
//       isSearchable={allowSearch}
//       isDisabled={disabled}
//       value={value}
//       onChange={onChange}
//       className={join(props.className, baseClassName)}
//       name={name}
//       isMulti={multiple}
//       options={finalOptions}
//       isClearable={showClearButton}
//     />
//   );
// };

// export default Dropdown;
