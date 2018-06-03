import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { ToolbarStrategyViewPopupProps } from "../Components/SharedProps/ToolbarStrategyViewPopupProps";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import { PanelDashboard } from "../Components/Panels/PanelDashboard";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";
import { ISelectedCellInfo, ISelectedCell } from "../../Strategy/Interface/ISelectedCellsStrategy";
import { DataType, SelectedCellOperation } from "../../Core/Enums";
import { FormControl, DropdownButton, MenuItem, InputGroup, ControlLabel } from "react-bootstrap";
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'


interface SelectedCellsToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<SelectedCellsToolbarControlComponent> {
    SelectedCellInfo: ISelectedCellInfo
}

interface SelectedCellsToolbarControlComponentState {
    Sum: Number,
    SubFunc: any
}

class SelectedCellsToolbarControlComponent extends React.Component<SelectedCellsToolbarControlComponentProps, SelectedCellsToolbarControlComponentState> {
    constructor(props: SelectedCellsToolbarControlComponentProps) {
        super(props);
        this.state = {
            Sum: null,
            SubFunc: (sender: IAdaptableBlotter, event: IAdaptableBlotter) => {
                this.onSelectionChanged()
            }
        }
    }
    public componentDidMount() {
        if (this.props.AdaptableBlotter) {
            this.props.AdaptableBlotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc)
        }
    }

    public componentWillUnmount() {
        if (this.props.AdaptableBlotter) {
            this.props.AdaptableBlotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc)
        }
    }


    render() {

        let cssClassName: string = this.props.cssClassName + "__SelectedCells";

        let operationMenuItems = EnumExtensions.getNames(SelectedCellOperation).map((selectedCellOperation: SelectedCellOperation, index) => {
            return <MenuItem key={index} eventKey="index" >{selectedCellOperation as SelectedCellOperation}</MenuItem>
        })

        let content = <span>
            <div className={this.props.IsReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <InputGroup>

                    <DropdownButton style={{ marginRight: "3px", width: "75px" }} title={"Sum"} id="SelectedCells_Operation" bsSize="small" componentClass={InputGroup.Button}>
                        {operationMenuItems}
                    </DropdownButton>
                    <ControlLabel style={{ marginTop: "5px", marginLeft: "3px" }}>{this.state.Sum} </ControlLabel>
                </InputGroup>


            </div>
        </span>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.SelectedCellsStrategyName} glyphicon={StrategyGlyphs.SelectedCellsGlyph} onClose={() => this.props.onClose(StrategyIds.SelectedCellsStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}

        </PanelDashboard>
    }




    private onSelectionChanged(): void {
        let runningSumTotal: number = 0
        let selectedCellInfo = this.props.SelectedCellInfo
        if (selectedCellInfo.Selection.size > 0) {
            // this is very rough adn ready first draft but we will refactor and improve
            let numericColumns: number[] = []
            selectedCellInfo.Columns.map((c, index) => {
                if (c.DataType == DataType.Number) {
                    numericColumns.push(index)
                }
            })

            // first get sum
            selectedCellInfo.Selection.forEach(selectedCells => {
                numericColumns.forEach(nc => {
                    let numericCell: ISelectedCell = selectedCells[nc];
                    runningSumTotal = runningSumTotal + Number(numericCell.value)
                })

            })
        }
        runningSumTotal = Math.round(parseFloat(runningSumTotal.toFixed(12)) * 10000) / 10000;
        this.setState({ Sum: runningSumTotal });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SelectedCellInfo: state.Grid.SelectedCellInfo,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardSetToolbarVisibility(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.SelectedCellsPopup, isReadOnly))
    };
}

export let SelectedCellsToolbarControl = connect(mapStateToProps, mapDispatchToProps)(SelectedCellsToolbarControlComponent);
