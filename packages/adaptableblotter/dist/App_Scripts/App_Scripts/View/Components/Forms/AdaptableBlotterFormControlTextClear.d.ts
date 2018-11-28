import * as React from "react";
import { FormControlProps } from 'react-bootstrap';
export interface AdaptableBlotterFormControlTextClearProps extends FormControlProps {
    OnTextChange: (textValue: string) => void;
    autoFocus?: boolean;
    cssClassName: string;
}
export declare class AdaptableBlotterFormControlTextClear extends React.Component<AdaptableBlotterFormControlTextClearProps, {}> {
    render(): JSX.Element;
}
