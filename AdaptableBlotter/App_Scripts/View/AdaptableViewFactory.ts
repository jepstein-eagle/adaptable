import {CustomSortConfig} from './CustomSortConfig'
import {SmartEditAction} from './SmartEditAction'
import {ShortcutConfig} from './ShortcutConfig'
import * as React from "react";

export const AdaptableViewFactory: IAdaptableViewFactory = {
  CustomSortConfig: CustomSortConfig,
  SmartEditAction: SmartEditAction,
  ShortcutConfig: ShortcutConfig
}


interface IAdaptableViewFactory {
  [key: string]: any;
}