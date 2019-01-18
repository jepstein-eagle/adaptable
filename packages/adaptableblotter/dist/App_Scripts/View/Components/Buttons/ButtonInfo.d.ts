import * as React from "react";
import { ButtonProps } from './ButtonBase';
export interface InfoButtonProps extends ButtonProps {
    glyph: string;
    tooltipText: string;
}
export declare class ButtonInfo extends React.Component<InfoButtonProps, {}> {
    render(): JSX.Element;
}
