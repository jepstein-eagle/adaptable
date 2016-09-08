import {CustomSortConfig} from './CustomSortConfig'
import {SmartEditAction} from './SmartEditAction'
import {ShortcutConfig} from './ShortcutConfig'
import {PlusMinusConfig} from './PlusMinusConfig'
import * as React from "react";

export const AdaptableViewFactory: IAdaptableViewFactory = {
  CustomSortConfig: CustomSortConfig,
  SmartEditAction: SmartEditAction,
  ShortcutConfig: ShortcutConfig,
  PlusMinusConfig: PlusMinusConfig
}


interface IAdaptableViewFactory {
  [key: string]: any;
}