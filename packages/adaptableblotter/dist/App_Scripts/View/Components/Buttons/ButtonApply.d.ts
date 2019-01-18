import * as React from "react";
import { ButtonProps } from './ButtonBase';
export interface ApplyButtonProps extends ButtonProps {
    glyph: string;
}
export declare class ButtonApply extends React.Component<ApplyButtonProps, {}> {
    render(): JSX.Element;
}
