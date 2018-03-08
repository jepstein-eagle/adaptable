import * as Redux from 'redux';

export interface IMenuItem {
    Label: string;
    StrategyId: string;
    Action: Redux.Action;
    IsReadOnly: boolean;
    IsVisible: boolean;
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
