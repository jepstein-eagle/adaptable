/// <reference types="react-bootstrap" />
import * as React from "react";
import { IAdaptableBlotterObject } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
export interface ButtonProps extends React.ClassAttributes<ButtonBase> {
    onClick?: () => void;
    overrideDisableButton?: boolean;
    overrideTooltip?: string;
    ConfigEntity?: IAdaptableBlotterObject;
    style?: React.CSSProperties;
    size?: ReactBootstrap.Sizes;
    overrideText?: string;
    DisplayMode: "Glyph" | "Text" | "Glyph+Text" | "Text+Glyph";
    transformGlyph?: boolean;
    bsStyle?: string;
    cssClassName: string;
    glyph?: string;
    hideToolTip?: boolean;
}
export interface ButtonBaseProps extends ButtonProps {
    ToolTipAndText: string;
    bsStyle: string;
    bsSize: ReactBootstrap.Sizes;
    glyph: string;
}
export declare class ButtonBase extends React.Component<ButtonBaseProps, {}> {
    static defaultProps: ButtonBaseProps;
    render(): JSX.Element;
}
