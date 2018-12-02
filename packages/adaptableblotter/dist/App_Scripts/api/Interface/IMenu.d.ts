import * as Redux from 'redux';
export interface IMenuItem {
    Label: string;
    StrategyId: string;
    Action: Redux.Action;
    IsVisible: boolean;
    GlyphIcon: string;
}
export interface IContextMenu {
    ColumnId: string;
    Items: IMenuItem[];
}
