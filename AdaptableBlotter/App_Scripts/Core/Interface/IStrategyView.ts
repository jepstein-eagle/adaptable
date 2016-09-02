import {IAdaptableBlotter} from './IAdaptableBlotter';
import * as React from "react";

export interface IStrategyViewPopupProps<View> extends React.ClassAttributes<View> {
    AdaptableBlotter: IAdaptableBlotter
}
