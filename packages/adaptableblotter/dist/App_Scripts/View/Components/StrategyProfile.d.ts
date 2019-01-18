import * as React from "react";
export interface StrategyProfileProps extends React.ClassAttributes<StrategyProfile> {
    StrategyId: string;
    cssClassName: string;
}
export declare class StrategyProfile extends React.Component<StrategyProfileProps, {}> {
    render(): any;
}
