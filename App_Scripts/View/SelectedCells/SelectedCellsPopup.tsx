import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import {  ControlLabel } from 'react-bootstrap';
import { StrategyViewPopupProps } from "../Components/SharedProps/StrategyViewPopupProps";
import { EditableConfigEntityState } from "../Components/SharedProps/EditableConfigEntityState";
import { IColItem } from "../UIInterfaces";
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";
import * as SelectedCellsRedux from '../../Redux/ActionsReducers/SelectedCellsRedux'
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { PanelWithRow } from "../Components/Panels/PanelWithRow";
import { ISelectedCellSummmary } from "../../Strategy/Interface/ISelectedCellsStrategy";
import { Helper } from "../../Core/Helpers/Helper";
import { AdaptableObjectRow } from "../Components/AdaptableObjectRow";
import { SelectedCellOperation } from "../../Core/Enums";


interface SelectedCellsPopupProps extends StrategyViewPopupProps<SelectedCellsPopupComponent> {
    SelectedCellSummary: ISelectedCellSummmary
    onSelectedCellsCreateSummary: () => SelectedCellsRedux.SelectedCellsCreateSummaryAction;
}

class SelectedCellsPopupComponent extends React.Component<SelectedCellsPopupProps, EditableConfigEntityState> {

    public componentDidMount() {
        this.props.onSelectedCellsCreateSummary();
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__SelectedCells";
        let colItems: IColItem[] = [
            { Content: "Operation", Size: 6 },
            { Content: "Value", Size: 6 },
        ]
        let infoBody: any[] = ["Selected cells info."]

        let rowElements: any[] = []
        if (this.props.SelectedCellSummary != null) {
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Sum, this.props.SelectedCellSummary.Sum, cssClassName));
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Average, this.props.SelectedCellSummary.Average, cssClassName));
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Mode, this.props.SelectedCellSummary.Mode, cssClassName));
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Median, this.props.SelectedCellSummary.Median, cssClassName));
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Distinct, this.props.SelectedCellSummary.Distinct, cssClassName));
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Max, this.props.SelectedCellSummary.Max, cssClassName));
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Min, this.props.SelectedCellSummary.Min, cssClassName));
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Count, this.props.SelectedCellSummary.Count, cssClassName));
            rowElements.push(this.createRow(colItems, SelectedCellOperation.Only, this.props.SelectedCellSummary.Only, cssClassName));
        }

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyNames.SelectedCellsStrategyName} className="ab_main_popup"
                bsStyle="primary" glyphicon={StrategyGlyphs.SelectedCellsGlyph}
                infoBody={infoBody}>

                <div className={this.props.cssClassName + StyleConstants.ITEMS_TABLE}>
                    <PanelWithRow cssClassName={cssClassName} colItems={colItems} bsStyle="info" />
                    {this.props.SelectedCellSummary != null ?
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

    private createRow(colItems: IColItem[], key: SelectedCellOperation, value: any, cssClassName: string): any {
        let rowColItems: IColItem[] = Helper.cloneObject(colItems)
        rowColItems[0].Content = key
        rowColItems[1].Content = value
        let rowElement = <AdaptableObjectRow cssClassName={cssClassName} key={key} colItems={rowColItems} />
        return rowElement
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SelectedCellSummary: state.SelectedCells.SelectedCellSummary
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectedCellsCreateSummary: () => dispatch(SelectedCellsRedux.SelectedCellCreateSummary()),
    };
}

export let SelectedCellsPopup = connect(mapStateToProps, mapDispatchToProps)(SelectedCellsPopupComponent);

