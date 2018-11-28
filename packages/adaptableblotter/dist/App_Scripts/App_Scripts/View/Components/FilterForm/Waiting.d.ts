import * as React from "react";
export interface WaitingProps extends React.ClassAttributes<Waiting> {
    WaitingMessage: string;
}
export declare class Waiting extends React.Component<WaitingProps, {}> {
    render(): any;
}
