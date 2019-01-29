import { ILayout } from "../../Utilities/Interface/BlotterObjects/ILayout";
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
     * Retrieves current Layout name
     */
    GetCurrentName(): string;
    /**
    * Retrieves the layout with the inputted name
     */
    GetByName(layoutName: string): ILayout;
    /**
     * Retrieves all Layouts in State
     */
    GetAll(): ILayout[];
    /**
     * Saves the current layout - using the column order and grid sort info currently in the grid
     */
    Save(): void;
}
