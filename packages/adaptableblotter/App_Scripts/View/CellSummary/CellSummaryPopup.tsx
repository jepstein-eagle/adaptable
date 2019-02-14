import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { StrategyViewPopupProps } from "../Components/SharedProps/StrategyViewPopupProps";
import { EditableConfigEntityState } from "../Components/SharedProps/EditableConfigEntityState";
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ICellSummmary } from "../../Utilities/Interface/SelectedCell/ICellSummmary";
import { CellSummaryDetails } from "./CellSummaryDetails";


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
      
        let infoBody: any[] = ["Selected cells info."]

       

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyConstants.CellSummaryStrategyName} className="ab_main_popup"
                bsStyle="primary" glyphicon={StrategyConstants.CellSummaryGlyph}
                infoBody={infoBody}>

                <div className={this.props.cssClassName + StyleConstants.ITEMS_TABLE}>
                   <CellSummaryDetails cssClassName={cssClassName} CellSummary={this.props.CellSummary} />
                </div>

            </PanelWithButton>
        </div>
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

