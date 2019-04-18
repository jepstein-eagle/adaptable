import * as React from "react";
import { ButtonProps } from './ButtonBase';
export interface MaximiseButtonProps extends ButtonProps {
    useHoirzontalChevron?: boolean;
}
export declare class ButtonMaximise extends React.Component<MaximiseButtonProps, {}> {
    render(): JSX.Element;
}
