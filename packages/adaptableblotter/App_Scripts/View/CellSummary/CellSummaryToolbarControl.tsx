import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as SelectedCellsRedux from '../../Redux/ActionsReducers/CellSummaryRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups'
import { ToolbarStrategyViewPopupProps } from "../Components/SharedProps/ToolbarStrategyViewPopupProps";
import { IAdaptableBlotter } from "../../Utilities/Interface/IAdaptableBlotter";
import { PanelDashboard } from "../Components/Panels/PanelDashboard";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";
import { ISelectedCellInfo } from "../../Utilities/Interface/SelectedCell/ISelectedCellInfo";
import { AccessLevel, CellSumaryOperation } from "../../Utilities/Enums";
import { DropdownButton, MenuItem, InputGroup, ControlLabel } from "react-bootstrap";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import { ICellSummmary } from "../../Utilities/Interface/SelectedCell/ICellSummmary";

interface CellSummaryToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<CellSummaryToolbarControlComponent> {
    SelectedCellInfo: ISelectedCellInfo
    CellSumaryOperation: CellSumaryOperation
    onCellSummaryOperationChange: (SelectedCellOperation: CellSumaryOperation) => SelectedCellsRedux.CellSummaryChangeOperationAction;
    onCreateCellSummary: () => GridRedux.GridCreateCellSummaryAction;
    CellSummary: ICellSummmary
}

interface CellSummaryToolbarControlComponentState {
    SubFunc: any
}

class CellSummaryToolbarControlComponent extends React.Component<CellSummaryToolbarControlComponentProps, CellSummaryToolbarControlComponentState> {
    constructor(props: CellSummaryToolbarControlComponentProps) {
        super(props);
        this.state = {
            SubFunc: (sender: IAdaptableBlotter, event: IAdaptableBlotter) => {
                this.onSelectionChanged()
            }
        }
    }
    public componentDidMount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc)
        }
    }

    public componentWillUnmount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc)
        }
    }


    render() {

        let cssClassName: string = this.props.cssClassName + "__CellSummary";

        let operationMenuItems = EnumExtensions.getNames(CellSumaryOperation).map((selectedCellOperation: CellSumaryOperation, index) => {
            return <MenuItem key={index} eventKey="index" onClick={() => this.props.onCellSummaryOperationChange(selectedCellOperation)}>{selectedCellOperation as CellSumaryOperation}</MenuItem>
        })

        let content = <span>
            <div className={this.props.AccessLevel==AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <InputGroup>
                    <DropdownButton style={{ marginRight: "3px", width: "75px" }} title={this.props.CellSumaryOperation} id="CellSummary_Operation" bsSize="small" componentClass={InputGroup.Button}>
                        {operationMenuItems}
                    </DropdownButton>
                    {this.props.CellSummary != null &&
                        <ControlLabel style={{ marginTop: "5px", marginLeft: "3px" }}>{this.getOperationValue()} </ControlLabel>
                    }
                </InputGroup>


            </div>
        </span>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyConstants.CellSummaryStrategyName} glyphicon={StrategyConstants.CellSummaryGlyph} onClose={() => this.props.onClose(StrategyConstants.CellSummaryStrategyId)} onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }


    private onSelectionChanged(): void {
        this.props.onCreateCellSummary();
    }

    private getOperationValue(): any {
        switch (this.props.CellSumaryOperation) {
            case CellSumaryOperation.Sum:
                return this.props.CellSummary.Sum;
            case CellSumaryOperation.Average:
                return this.props.CellSummary.Average;
             case CellSumaryOperation.Median:
                return this.props.CellSummary.Median;
            case CellSumaryOperation.Max:
                return this.props.CellSummary.Max;
            case CellSumaryOperation.Min:
                return this.props.CellSummary.Min;
            case CellSumaryOperation.Distinct:
                return this.props.CellSummary.Distinct;
            case CellSumaryOperation.Count:
                return this.props.CellSummary.Count;
            case CellSumaryOperation.Only:
                return this.props.CellSummary.Only;
            case CellSumaryOperation.VWAP:
                return this.props.CellSummary.VWAP;
        }
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SelectedCellInfo: state.Grid.SelectedCellInfo,
        CellSumaryOperation: state.CellSummary.CellSumaryOperation,
        CellSummary: state.Grid.CellSummary,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onCellSummaryOperationChange: (CellSumaryOperation: CellSumaryOperation) => dispatch(SelectedCellsRedux.CellSummaryChangeOperation(CellSumaryOperation)),
        onCreateCellSummary: () => dispatch(GridRedux.GridCreateCellSummary()),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.CellSummaryStrategyId, ScreenPopups.CellSummaryPopup))
    };
}

export let CellSummaryToolbarControl = connect(mapStateToProps, mapDispatchToProps)(CellSummaryToolbarControlComponent);
