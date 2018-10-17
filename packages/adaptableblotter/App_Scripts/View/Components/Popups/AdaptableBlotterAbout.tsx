import * as React from "react";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { PanelWithImage } from '../Panels/PanelWithImage';
import { AdaptableObjectRow } from "../AdaptableObjectRow";
import { IColItem } from "../../UIInterfaces";
import { Helper } from "../../../Core/Helpers/Helper";
import { AdaptableObjectCollection } from "../AdaptableObjectCollection";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";
import { IAdaptableBlotterOptions } from "../../../Core/Api/Interface/IAdaptableBlotterOptions";
import { ICalculatedColumn, IGridSort, IColumnFilter } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";
import { ColumnFilterHelper } from "../../../Core/Helpers/ColumnFilterHelper";
import { IAdaptableBlotter } from "../../../Core/Interface/IAdaptableBlotter";
import { Modal, Button } from "react-bootstrap";
import * as StyleConstants from '../../../Core/Constants/StyleConstants';
import { UIHelper } from "../../UIHelper";
import { IColumn } from "../../../Core/Interface/IColumn";
import { AdaptableBlotterState } from "../../../Redux/Store/Interface/IAdaptableStore";


interface AdaptableBlotterAboutProps extends React.ClassAttributes<AdaptableBlotterAbout> {
    AdaptableBlotter: IAdaptableBlotter
    //    onClearColumnFilters: () => ColumnFilterRedux.ColumnFilterClearAllAction,
    //    onClearAllSorts: () => GridRedux.GridSetSortAction,
    onClose?: Function;
    showAbout: boolean;
}


export class AdaptableBlotterAbout extends React.Component<AdaptableBlotterAboutProps, {}> {

    render() {
        let cssClassName: string = StyleConstants.AB_STYLE
        let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);

        let colItems: IColItem[] = [
            { Content: "Property", Size: 5 },
            { Content: "Value", Size: 5 },
            { Content: "", Size: 2 },
        ]

        let aboutItems = this.CreateAboutInfo(colItems).map((x, index) => {
            return <AdaptableObjectRow cssClassName={cssClassName} key={index} colItems={x} />
        })

        return <Modal show={this.props.showAbout} onHide={this.props.onClose} className={cssClassName + StyleConstants.BASE}
            container={modalContainer} >
            <div className={cssClassName + StyleConstants.MODAL_BASE} >
                <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>

                    <div className={cssClassName}>
                        <PanelWithImage cssClassName={cssClassName} header={"About"} bsStyle="primary" glyphicon={"info-sign"}>
                            <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={aboutItems} />
                        </PanelWithImage>
                    </div>
                </Modal.Body>
                <Modal.Footer className={cssClassName + StyleConstants.MODAL_FOOTER}>
                    <Button className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON} onClick={() => this.props.onClose()}>Close</Button>
                </Modal.Footer>
            </div>
        </Modal>
    }

    public CreateAboutInfo(colItems: IColItem[]): IColItem[][] {

        //get state - do better?
        let state: AdaptableBlotterState = this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState()

        let calculatedColumns: ICalculatedColumn[] = state.CalculatedColumn.CalculatedColumns
        let columns: IColumn[] = state.Grid.Columns
        let gridSorts: IGridSort[] = state.Grid.GridSorts
        let columnFilters: IColumnFilter[] = state.ColumnFilter.ColumnFilters

        let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.BlotterOptions;
        let returnRows: IColItem[][] = []
        returnRows.push(this.createColItem(colItems, "Vendor Grid", this.props.AdaptableBlotter.VendorGridName));
        returnRows.push(this.createColItem(colItems, "Adaptable Blotter Version", "2.5"));

        if (options.blotterId != undefined) {
            returnRows.push(this.createColItem(colItems, "Blotter Id", options.blotterId));
        }
        if (options.userName != undefined) {
            returnRows.push(this.createColItem(colItems, "User", options.userName));
        }
        if (options.enableAuditLog != undefined) {
            returnRows.push(this.createColItem(colItems, "Audit Log", (options.enableAuditLog) ? "On" : "Off"));
        }
        if (options.enableRemoteConfigServer != undefined) {
            returnRows.push(this.createColItem(colItems, "Remote Configuration", (options.enableRemoteConfigServer) ? "On" : "Off"));
        }
        if (options.serverSearchOption != undefined) {
            returnRows.push(this.createColItem(colItems, "Server Search Option", options.serverSearchOption));
        }
        returnRows.push(this.createColItem(colItems, "Can Sort", this.props.AdaptableBlotter.isSortable() ? "True" : "False"));

        let sorts = gridSorts.map(gs => {
            return ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + ": " + gs.SortOrder
        })
        //   let clearSortsButton = <ButtonClear onClick={() => this.props.onClearAllSorts()} bsStyle={"primary"} cssClassName={cssClassName} size={"small"} overrideTooltip="Clear Grid Sorts" DisplayMode="Text+Glyph" overrideDisableButton={ArrayExtensions.IsNullOrEmpty(this.props.GridSorts)} />

        returnRows.push(this.createColItem(colItems, "Sorted Columns", ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join("; ") : "None"));
        returnRows.push(this.createColItem(colItems, "Can Filter", this.props.AdaptableBlotter.isFilterable() ? "True" : "False"));

        //    let clearFilterButton = <ButtonClear onClick={() => this.clearColumnFilters()} bsStyle={"primary"} cssClassName={cssClassName} size={"small"} overrideTooltip="Clear Column Filters" DisplayMode="Text+Glyph" overrideDisableButton={ArrayExtensions.IsNullOrEmpty(this.props.ColumnFilters)} />

        returnRows.push(this.createColItem(colItems, "Column Filters", ColumnFilterHelper.getColumnFiltersDescription(columnFilters, columns, this.props.AdaptableBlotter)));
        returnRows.push(this.createColItem(colItems, "All Rows", this.props.AdaptableBlotter.getRowCount()));
        returnRows.push(this.createColItem(colItems, "Visible Rows", this.props.AdaptableBlotter.getVisibleRowCount()));
        returnRows.push(this.createColItem(colItems, "All Columns", this.props.AdaptableBlotter.getColumnCount()));
        returnRows.push(this.createColItem(colItems, "Visible Column", this.props.AdaptableBlotter.getVisibleColumnCount()));
        returnRows.push(this.createColItem(colItems, "Can Multi Select", this.props.AdaptableBlotter.isSelectable() ? "True" : "False"));

        let calcColumns: string[] = calculatedColumns.map(c => c.ColumnId)
        returnRows.push(this.createColItem(colItems, "Calculated Columns", ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : "None"))
        return returnRows;
    }

    createColItem(colItems: IColItem[], item1: any, item2: any, item3: any = null): IColItem[] {
        let rowColItems: IColItem[] = Helper.cloneObject(colItems)
        rowColItems[0].Content = item1
        rowColItems[1].Content = item2
        rowColItems[2].Content = item3

        return rowColItems;
    }

    //  clearColumnFilters() {
    //     this.props.onClearColumnFilters();
    //     this.forceUpdate();
    //  }
}

