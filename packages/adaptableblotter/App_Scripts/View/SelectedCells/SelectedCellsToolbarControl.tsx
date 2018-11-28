import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as SelectedCellsRedux from '../../Redux/ActionsReducers/SelectedCellsRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { ToolbarStrategyViewPopupProps } from "../Components/SharedProps/ToolbarStrategyViewPopupProps";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import { PanelDashboard } from "../Components/Panels/PanelDashboard";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";
import { ISelectedCellInfo, ISelectedCellSummmary } from "../../Strategy/Interface/ISelectedCellsStrategy";
import { SelectedCellOperation, AccessLevel } from "../../Core/Enums";
import { DropdownButton, MenuItem, InputGroup, ControlLabel } from "react-bootstrap";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { IEntitlement } from "../../Core/Interface/Interfaces";

interface SelectedCellsToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<SelectedCellsToolbarControlComponent> {
    SelectedCellInfo: ISelectedCellInfo
    SelectedCellOperation: SelectedCellOperation
    onSelectedCellsOperationChange: (SelectedCellOperation: SelectedCellOperation) => SelectedCellsRedux.SelectedCellsChangeOperationAction;
    onSelectedCellsCreateSummary: () => GridRedux.GridCreateSelectedCellSummaryAction;
    SelectedCellSummary: ISelectedCellSummmary
   
}

interface SelectedCellsToolbarControlComponentState {
    SubFunc: any
}

class SelectedCellsToolbarControlComponent extends React.Component<SelectedCellsToolbarControlComponentProps, SelectedCellsToolbarControlComponentState> {
    constructor(props: SelectedCellsToolbarControlComponentProps) {
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

        let cssClassName: string = this.props.cssClassName + "__SelectedCells";

        let operationMenuItems = EnumExtensions.getNames(SelectedCellOperation).map((selectedCellOperation: SelectedCellOperation, index) => {
            return <MenuItem key={index} eventKey="index" onClick={() => this.props.onSelectedCellsOperationChange(selectedCellOperation)}>{selectedCellOperation as SelectedCellOperation}</MenuItem>
        })

        let content = <span>
            <div className={this.props.AccessLevel==AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <InputGroup>
                    <DropdownButton style={{ marginRight: "3px", width: "75px" }} title={this.props.SelectedCellOperation} id="SelectedCells_Operation" bsSize="small" componentClass={InputGroup.Button}>
                        {operationMenuItems}
                    </DropdownButton>
                    {this.props.SelectedCellSummary != null &&
                        <ControlLabel style={{ marginTop: "5px", marginLeft: "3px" }}>{this.getOperationValue()} </ControlLabel>
                    }
                </InputGroup>


            </div>
        </span>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyConstants.SelectedCellsStrategyName} glyphicon={StrategyConstants.SelectedCellsGlyph} onClose={() => this.props.onClose(StrategyConstants.SelectedCellsStrategyId)} onConfigure={() => this.props.onConfigure()}>
            {content}

        </PanelDashboard>
    }




    private onSelectionChanged(): void {
        this.props.onSelectedCellsCreateSummary();

        //     this.setState({ SelectedCellSummmary: selectedCellSummary } as SelectedCellsToolbarControlComponentState);
    }

    private getOperationValue(): any {
        switch (this.props.SelectedCellOperation) {
            case SelectedCellOperation.Sum:
                return this.props.SelectedCellSummary.Sum;
            case SelectedCellOperation.Average:
                return this.props.SelectedCellSummary.Average;
             case SelectedCellOperation.Median:
                return this.props.SelectedCellSummary.Median;
            case SelectedCellOperation.Max:
                return this.props.SelectedCellSummary.Max;
            case SelectedCellOperation.Min:
                return this.props.SelectedCellSummary.Min;
            case SelectedCellOperation.Distinct:
                return this.props.SelectedCellSummary.Distinct;
            case SelectedCellOperation.Count:
                return this.props.SelectedCellSummary.Count;
            case SelectedCellOperation.Only:
                return this.props.SelectedCellSummary.Only;
            case SelectedCellOperation.VWAP:
                return this.props.SelectedCellSummary.VWAP;
        }
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SelectedCellInfo: state.Grid.SelectedCellInfo,
        SelectedCellOperation: state.SelectedCells.SelectedCellOperation,
        SelectedCellSummary: state.Grid.SelectedCellSummary,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectedCellsOperationChange: (SelectedCellOperation: SelectedCellOperation) => dispatch(SelectedCellsRedux.SelectedCellsChangeOperation(SelectedCellOperation)),
        onSelectedCellsCreateSummary: () => dispatch(GridRedux.GridCreateSelectedCellSummary()),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.SelectedCellsStrategyId, ScreenPopups.SelectedCellsPopup))
    };
}

export let SelectedCellsToolbarControl = connect(mapStateToProps, mapDispatchToProps)(SelectedCellsToolbarControlComponent);
