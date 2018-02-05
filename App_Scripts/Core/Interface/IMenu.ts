import { IEntitlement } from '../../Core/Interface/IAdaptableBlotter'
import * as Redux from 'redux';



export interface IMenuItem {
    Label: string;
    StrategyId: string;
    Action: Redux.Action;
    IsEnabled: boolean;
    GlyphIcon: string
}

export interface IContextMenu {
    BuildContextMenu: boolean
    IsVisible: boolean
    PositionX: number
    PositionY: number
    ColumnId: string
    Items: IMenuItem[]
}
