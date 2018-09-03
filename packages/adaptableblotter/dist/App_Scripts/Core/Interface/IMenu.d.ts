import * as Redux from 'redux';
export interface IMenuItem {
    Label: string;
    StrategyId: string;
    Action: Redux.Action;
    IsReadOnly: boolean;
    IsVisible: boolean;
    GlyphIcon: string;
}
export interface IContextMenu {
    ColumnId: string;
    Items: IMenuItem[];
}
