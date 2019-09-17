import * as React from 'react';
import { SyntheticEvent, HTMLProps, useContext, useRef, MouseEvent, MutableRefObject } from 'react';

import useProperty from '../utils/useProperty';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';

type SelectableListValues = {
  [key: string]: boolean;
};
type ClickInfo = {
  lastClickIndexWithoutShift: number;
  lastShiftSelectionRange?: { start: number; end: number };
};
type ClickInfoRef = MutableRefObject<ClickInfo>;

const SelectableListContext = React.createContext<{
  selected: SelectableListValues;
  setSelected?: (seleted: SelectableListValues) => void;
  toggleOnSimpleClick?: boolean;
  getItemId?: (index: number) => string | number;
  clickInfoRef?: ClickInfoRef;
}>({
  clickInfoRef: null,
  selected: {},
  getItemId: index => index,
  toggleOnSimpleClick: false,
  setSelected: (x: SelectableListValues) => {},
});

export const useSelectionEvent = () => {
  const { selected, setSelected, toggleOnSimpleClick, clickInfoRef, getItemId } = useContext(
    SelectableListContext
  );

  return (event: SyntheticEvent, { index }: { index: number }) => {
    if (index === undefined) {
      LoggingHelper.LogAdaptableBlotterWarning('No "index" was passed to the list item');
      return;
    }

    const { lastClickIndexWithoutShift, lastShiftSelectionRange } = clickInfoRef.current;

    let { shiftKey, metaKey, ctrlKey } = event as MouseEvent;
    if (ctrlKey) {
      metaKey = true;
    }

    if (metaKey) {
      // as if shift key is not pressed
      shiftKey = false;
    }

    let itemId = `${getItemId(index)}`;

    let newSelection: SelectableListValues;
    if (!shiftKey) {
      clickInfoRef.current.lastClickIndexWithoutShift = index;
      if (!metaKey && !toggleOnSimpleClick) {
        // a simple click, no key modifiers
        // so reset the selection
        // and only add one item, the currently clicked item
        newSelection = { [itemId]: true };
      } else {
        const currentRowSelected = selected[itemId];

        newSelection = { ...selected };
        if (currentRowSelected) {
          // unselected the current row
          delete newSelection[itemId];

          // also, when unselecting, the click position should not be remembered, so need to revert it back
          clickInfoRef.current.lastClickIndexWithoutShift = lastClickIndexWithoutShift;
        } else {
          newSelection[itemId] = true;
        }
      }
      clickInfoRef.current.lastShiftSelectionRange = null;
      setSelected(newSelection);
    } else {
      let prevClickIndex = lastClickIndexWithoutShift;
      let currentClickIndex = index;

      newSelection = { ...selected };

      if (lastShiftSelectionRange) {
        let { start, end } = lastShiftSelectionRange;
        // clear previous shift selection
        for (; start <= end; start++) {
          delete newSelection[getItemId(start)];
        }
      }

      let [start, end] = [
        Math.min(prevClickIndex, currentClickIndex),
        Math.max(prevClickIndex, currentClickIndex),
      ];

      clickInfoRef.current.lastShiftSelectionRange = { start, end };

      for (; start <= end; start++) {
        newSelection[getItemId(start)] = true;
      }

      setSelected(newSelection);
    }
  };
};

interface SelectableListProps {
  onSelectedChange?: (selected: SelectableListValues) => void;
  toggleOnSimpleClick?: boolean;
  getItemId: (index: number) => string | number;
}

const SelectableList = (props: HTMLProps<HTMLElement> & SelectableListProps) => {
  const [selected, setSelected] = useProperty<SelectableListValues>(
    props,
    'selected',
    {} as SelectableListValues
  );

  const clickInfoRef: ClickInfoRef = useRef<ClickInfo>({
    lastClickIndexWithoutShift: 0,
  });

  const getItemId = (index: number) => {
    if (props.getItemId) {
      return props.getItemId(index);
    }

    return index;
  };

  return (
    <SelectableListContext.Provider
      value={{
        clickInfoRef,
        toggleOnSimpleClick: props.toggleOnSimpleClick || false,
        selected,
        setSelected,
        getItemId,
      }}
    >
      {props.children}
    </SelectableListContext.Provider>
  );
};

export default SelectableList;
