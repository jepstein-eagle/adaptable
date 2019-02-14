import * as React from "react";
import { Panel, Table } from "react-bootstrap";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ICellSummmary } from "../../Utilities/Interface/SelectedCell/ICellSummmary";
import { CellSummaryDetails } from "./CellSummaryDetails";

export interface CellSummaryPopoverProps extends React.ClassAttributes<CellSummaryPopover> {
    cssClassName: string;
    CellSummary: ICellSummmary
}

export class CellSummaryPopover extends React.Component<CellSummaryPopoverProps, {}> {
    render(): any {
        let cssClassName: string = this.props.cssClassName + StyleConstants.CELL_SUMMARY;

        return <div className={cssClassName} >
            <Panel header={""} bsStyle="info" className="ab_preview_panel" >
                 <CellSummaryDetails cssClassName={cssClassName} CellSummary={this.props.CellSummary} />
               </Panel>
        </div>
    }

}


