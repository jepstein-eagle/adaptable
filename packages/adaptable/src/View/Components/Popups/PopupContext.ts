import * as React from 'react';

export interface PopupContextProps {
  hidePopup: () => void;
}

const PopupContext = React.createContext<PopupContextProps>({
  hidePopup: () => {},
});

export const usePopupContext = (): PopupContextProps => {
  return React.useContext(PopupContext);
};

export default PopupContext;
