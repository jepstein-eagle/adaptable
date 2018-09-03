import * as React from "react";
export interface StrategyHeaderProps extends React.ClassAttributes<StrategyHeader> {
    key: string;
    StrategyId: string;
    StrategySummary: any;
    onNew: () => void;
    NewButtonTooltip: string;
    cssClassName: string;
    NewButtonDisabled?: boolean;
}
export declare class StrategyHeader extends React.Component<StrategyHeaderProps, {}> {
    render(): any;
}
