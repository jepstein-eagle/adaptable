import { BaseProps } from "./BaseProps";
export interface ChartDisplayPopupPropsBase<View> extends BaseProps<View> {
    onClose?: Function;
    ShowModal: boolean;
}
