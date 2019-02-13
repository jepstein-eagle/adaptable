import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import {  ControlLabel } from 'react-bootstrap';
import { StrategyViewPopupProps } from "../Components/SharedProps/StrategyViewPopupProps";
import { EditableConfigEntityState } from "../Components/SharedProps/EditableConfigEntityState";
import { IColItem } from "../UIInterfaces";
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { PanelWithRow } from "../Components/Panels/PanelWithRow";
import { Helper } from "../../Utilities/Helpers/Helper";
import { AdaptableObjectRow } from "../Components/AdaptableObjectRow";
import { CellSumaryOperation } from "../../Utilities/Enums";
import { ICellSummmary } from "../../Utilities/Interface/SelectedCell/ICellSummmary";


interface CellSummaryPopupProps extends StrategyViewPopupProps<CellSummaryPopupComponent> {
    CellSummary: ICellSummmary
    onSetSelectedCellSummary: () => GridRedux.GridSetCellSummaryAction
}

class CellSummaryPopupComponent extends React.Component<CellSummaryPopupProps, EditableConfigEntityState> {

    public componentDidMount() {
        this.props.onSetSelectedCellSummary();
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__CellSummary";
        let colItems: IColItem[] = [
            { Content: "Operation", Size: 3 },
            { Content: "Value", Size: 9},
        ]
        let infoBody: any[] = ["Selected cells info."]

        let rowElements: any[] = []
        if (this.props.CellSummary != null) {
            rowElements.push(this.createRow(colItems, CellSumaryOperation.Sum, this.props.CellSummary.Sum, cssClassName));
            rowElements.push(this.createRow(colItems, CellSumaryOperation.Average, this.props.CellSummary.Average, cssClassName));
            rowElements.push(this.createRow(colItems, CellSumaryOperation.Median, this.props.CellSummary.Median, cssClassName));
            rowElements.push(this.createRow(colItems, CellSumaryOperation.Distinct, this.props.CellSummary.Distinct, cssClassName));
            rowElements.push(this.createRow(colItems, CellSumaryOperation.Max, this.props.CellSummary.Max, cssClassName));
            rowElements.push(this.createRow(colItems, CellSumaryOperation.Min, this.props.CellSummary.Min, cssClassName));
            rowElements.push(this.createRow(colItems, CellSumaryOperation.Count, this.props.CellSummary.Count, cssClassName));
            rowElements.push(this.createRow(colItems, CellSumaryOperation.Only, this.props.CellSummary.Only, cssClassName));
            rowElements.push(this.createRow(colItems, CellSumaryOperation.VWAP, this.props.CellSummary.VWAP, cssClassName));
        }

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyConstants.CellSummaryStrategyName} className="ab_main_popup"
                bsStyle="primary" glyphicon={StrategyConstants.CellSummaryGlyph}
                infoBody={infoBody}>

                <div className={this.props.cssClassName + StyleConstants.ITEMS_TABLE}>
                    <PanelWithRow cssClassName={cssClassName} colItems={colItems} bsStyle="info" />
                    {this.props.CellSummary != null ?
                        <div className={cssClassName + StyleConstants.ITEMS_TABLE_BODY}>
                            {rowElements}
                        </div>
                        :
                        <ControlLabel>No cells are selected - please select some cells.</ControlLabel>
                    }
                </div>

            </PanelWithButton>
        </div>
    }

    private createRow(colItems: IColItem[], key: CellSumaryOperation, value: any, cssClassName: string): any {
        let rowColItems: IColItem[] = Helper.cloneObject(colItems)
        rowColItems[0].Content = key
        rowColItems[1].Content = value
        let rowElement = <AdaptableObjectRow cssClassName={cssClassName} key={key} colItems={rowColItems} />
        return rowElement
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CellSummary: state.Grid.CellSummary
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetSelectedCellSummary: () => dispatch(GridRedux.GridCreateCellSummary()),
    };
}

export let CellSummaryPopup = connect(mapStateToProps, mapDispatchToProps)(CellSummaryPopupComponent);

