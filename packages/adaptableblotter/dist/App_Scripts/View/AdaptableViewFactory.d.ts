import * as React from "react";
export declare const AdaptableViewFactory: IAdaptableViewFactory;
export declare const AdaptableDashboardViewFactory: Map<string, React.ComponentClass<any, any>>;
export declare const AdaptableDashboardPermanentToolbarFactory: Map<string, React.ComponentClass<any, any>>;
export interface IAdaptableViewFactory {
    [key: string]: any;
}
