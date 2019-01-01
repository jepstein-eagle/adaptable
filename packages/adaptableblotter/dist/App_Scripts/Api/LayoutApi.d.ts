import { ILayout } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
export interface ILayoutApi {
    /**
     * Selects the layout
     * @param layoutName has to be an existing layout
     */
    Set(layoutName: string): void;
    /**
       * Clears the currently selected layout
       */
    Clear(): void;
    /**
     * Retrieves current Layout
     */
    GetCurrent(): ILayout;
    /**
     * Retrieves all Layouts in State
     */
    GetAll(): ILayout[];
    /**
     * Saves the current layout - using the column order and grid sort info currently in the grid
     */
    Save(): void;
}
export declare class LayoutApi extends ApiBase implements ILayoutApi {
    Set(layoutName: string): void;
    Clear(): void;
    GetCurrent(): ILayout;
    GetAll(): ILayout[];
    Save(): void;
}
