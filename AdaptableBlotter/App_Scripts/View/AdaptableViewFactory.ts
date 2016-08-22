import {CustomSortConfig} from './CustomSortConfig'
import {SmartEditAction} from './SmartEditAction'
import * as React from "react";

export const AdaptableViewFactory : IAdaptableViewFactory = {
    CustomSortConfig: CustomSortConfig,
    SmartEditAction: SmartEditAction
    } 


interface IAdaptableViewFactory {
  [key: string]: any;
}