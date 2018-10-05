import * as React from "react";
import { AccessLevel } from "../../../Core/Enums";
export interface StrategyHeaderProps extends React.ClassAttributes<StrategyHeader> {
    key: string;
    StrategyId: string;
    StrategySummary: any;
    onNew: () => void;
    NewButtonTooltip: string;
    cssClassName: string;
    NewButtonDisabled?: boolean;
    AccessLevel: AccessLevel;
}
export declare class StrategyHeader extends React.Component<StrategyHeaderProps, {}> {
    render(): any;
}
