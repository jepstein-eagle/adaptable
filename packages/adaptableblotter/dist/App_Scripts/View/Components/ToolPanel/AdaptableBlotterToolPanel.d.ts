import * as React from "react";
import { IAdaptableBlotterToolPanelContext } from "../../../Utilities/Interface/IAdaptableBlotterToolPanelContext";
import { IToolPanelParams } from "ag-grid-community";
export interface AdaptableBlotterToolPanelState {
}
export declare const ConnectedAdaptableBlotterToolPanel: React.ComponentClass<any, any>;
export declare const AdaptableBlotterToolPanelBuilder: (ctx: IAdaptableBlotterToolPanelContext) => {
    new (): {
        gui: HTMLElement;
        ctx: IAdaptableBlotterToolPanelContext;
        init(params?: IToolPanelParams): void;
        getGui(): HTMLElement;
        refresh(): void;
    };
};
