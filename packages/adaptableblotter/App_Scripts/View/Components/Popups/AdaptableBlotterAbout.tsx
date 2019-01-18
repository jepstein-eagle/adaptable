import * as React from "react";
import { PanelWithImage } from '../Panels/PanelWithImage';
import { AdaptableObjectRow } from "../AdaptableObjectRow";
import { IColItem } from "../../UIInterfaces";
import { Helper } from "../../../Utilities/Helpers/Helper";
import { AdaptableObjectCollection } from "../AdaptableObjectCollection";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { IAdaptableBlotterOptions } from "../../../Utilities/Interface/IAdaptableBlotterOptions";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { ColumnFilterHelper } from "../../../Utilities/Helpers/ColumnFilterHelper";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
import { Modal, Button } from "react-bootstrap";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { UIHelper } from "../../UIHelper";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { AdaptableBlotterState } from "../../../Redux/Store/Interface/IAdaptableStore";


interface AdaptableBlotterAboutProps extends React.ClassAttributes<AdaptableBlotterAbout> {
    AdaptableBlotter: IAdaptableBlotter
    onClose?: Function;
    showAbout: boolean;
}


export class AdaptableBlotterAbout extends React.Component<AdaptableBlotterAboutProps, {}> {

    render() {
        let cssClassName: string = StyleConstants.AB_STYLE
        let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);

        let colItems: IColItem[] = [
            { Content: "Property", Size: 5 },
            { Content: "Value", Size: 7 },
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

        let returnRows: IColItem[][] = []
        if (this.props.showAbout) {
            //get state - do better?
            let state: AdaptableBlotterState = this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState()

            let calcColumns: string[] = state.CalculatedColumn.CalculatedColumns.map(c => c.ColumnId)
            let columns: IColumn[] = state.Grid.Columns
            let columnFilterDescription: string = ColumnFilterHelper.getColumnFiltersDescription(state.ColumnFilter.ColumnFilters, columns, this.props.AdaptableBlotter)
            let sorts = state.Grid.GridSorts.map(gs => {
                return ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + ": " + gs.SortOrder
            })
            let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.BlotterOptions;

            returnRows.push(this.createColItem(colItems, "Vendor Grid", this.props.AdaptableBlotter.VendorGridName));
            returnRows.push(this.createColItem(colItems, "Adaptable Blotter Version", "3.1"));

            if (options.blotterId != undefined) {
                returnRows.push(this.createColItem(colItems, "Blotter Id", options.blotterId));
            }
            if (options.userName != undefined) {
                returnRows.push(this.createColItem(colItems, "User", options.userName));
            }
            returnRows.push(this.createColItem(colItems, "Audit Log", (this.props.AdaptableBlotter.AuditLogService.IsAuditEnabled) ? "On" : "Off"));

            if (options.configServerOptions != undefined) {
                returnRows.push(this.createColItem(colItems, "Config Server", (options.configServerOptions.enableConfigServer) ? "On" : "Off"));
            }
            
            if (options.generalOptions.serverSearchOption != undefined) {
                returnRows.push(this.createColItem(colItems, "Server Search Option", options.generalOptions.serverSearchOption));
            }
            returnRows.push(this.createColItem(colItems, "Sorted Columns", ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join("; ") : "None"));
             returnRows.push(this.createColItem(colItems, "Column Filters", columnFilterDescription));
            returnRows.push(this.createColItem(colItems, "All Rows", this.props.AdaptableBlotter.getRowCount()));
            returnRows.push(this.createColItem(colItems, "Visible Rows", this.props.AdaptableBlotter.getVisibleRowCount()));
            returnRows.push(this.createColItem(colItems, "All Columns", this.props.AdaptableBlotter.getColumnCount()));
            returnRows.push(this.createColItem(colItems, "Visible Column", this.props.AdaptableBlotter.getVisibleColumnCount()));
            returnRows.push(this.createColItem(colItems, "Can Multi Select", this.props.AdaptableBlotter.isSelectable() ? "True" : "False"));
            returnRows.push(this.createColItem(colItems, "Calculated Columns", ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : "None"))
        }
        return returnRows;
    }

    createColItem(colItems: IColItem[], item1: any, item2: any): IColItem[] {
        let rowColItems: IColItem[] = Helper.cloneObject(colItems)
        rowColItems[0].Content = item1
        rowColItems[1].Content = item2
        return rowColItems;
    }

}

