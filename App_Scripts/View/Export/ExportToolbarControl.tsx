import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { Form, Dropdown, DropdownButton, Panel, FormControl, MenuItem, ControlLabel, Button, OverlayTrigger, Tooltip, FormGroup, Glyphicon, Label, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { IRange } from '../../Core/Interface/IExportStrategy'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IUIPrompt, IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/StrategyIds'
import { ExportDestination, SortOrder } from '../../Core/Enums';
import { RangeHelper } from "../../Core/Services/RangeHelper";

interface ExportToolbarControlComponentProps extends IStrategyViewPopupProps<ExportToolbarControlComponent> {
    onExportRange: (rangeUid: string, exportDestination: ExportDestination) => ExportRedux.ExportAction;
    onSelectRange: (rangeUid: string) => RangeRedux.RangeSelectAction;
    onNewRange: () => PopupRedux.PopupShowAction;
    onEditRange: () => PopupRedux.PopupShowAction;
    Columns: IColumn[],
    Ranges: IRange[];
    CurrentRangeId: string;
    RangeDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean
}

class ExportToolbarControlComponent extends React.Component<ExportToolbarControlComponentProps, {}> {
    componentWillReceiveProps(nextProps: ExportToolbarControlComponentProps, nextContext: any) {
        //if there was a selected search and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected text
        if (StringExtensions.IsNullOrEmpty(nextProps.CurrentRangeId) && StringExtensions.IsNotNullOrEmpty(this.props.CurrentRangeId)) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }
    render(): any {
        let savedRange: IRange = this.props.Ranges.find(s => s.Uid == this.props.CurrentRangeId);
        let sortedRanges = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.Ranges, "Name")

        let currentRangeId = StringExtensions.IsNullOrEmpty(this.props.CurrentRangeId) ?
            "select" : this.props.CurrentRangeId

        let availableRanges = this.props.Ranges.map((x, index) => {
            return <option value={x.Uid} key={index}>{x.Name}</option>
        })

        let csvMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, ExportDestination.CSV)} key={"csv"}>{"CSV"}</MenuItem>
        // let JSONMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, ExportDestination.JSON)} key={"json"}><Glyphicon glyph="export" /> {"JSON"}</MenuItem>
        let clipboardMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, ExportDestination.Clipboard)} key={"clipboard"}> {"Clipboard"}</MenuItem>
        // let excelMenuItem: any = <MenuItem disabled={true} onClick={() => this.props.onExportRange(currentRangeId, ExportDestination.Excel)} key={"excel"}><Glyphicon glyph="export" /> {"Excel"}</MenuItem>
        // let symphonyMenuItem: any = <MenuItem disabled={true} onClick={() => this.props.onExportRange(currentRangeId, ExportDestination.Symphony)} key={"symphony"}><Glyphicon glyph="export" /> {"Symphony"}</MenuItem>

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <Typeahead className={"adaptable_blotter_typeahead_inline"} ref="typeahead" emptyLabel={"No Ranges found with that search"}
                    placeholder={"Select a Range"}
                    labelKey={"Name"}
                    filterBy={["Name"]}
                    clearButton={true}
                    selected={savedRange ? [savedRange] : []}
                    onChange={(selected) => { this.onSelectedRangeChanged(selected) }}
                    options={sortedRanges}
                /> 
                {' '}
                {currentRangeId != "select" &&
                    <DropdownButton bsStyle="default" title="Export To" id="exportDropdown" disabled={currentRangeId == "select"} >
                        {csvMenuItem}
                        {clipboardMenuItem}
                    </DropdownButton>
                }
                {' '}
                <ButtonEdit onClick={() => this.props.onEditRange()}
                    overrideTooltip="Edit Range"
                    overrideDisableButton={RangeHelper.IsSystemRange(savedRange)}
                    ConfigEntity={savedRange}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonNew onClick={() => this.props.onNewRange()}
                    overrideTooltip="Create New Range"
                    DisplayMode="Glyph" />
                {' '}
                <ButtonDelete
                    overrideTooltip="Delete Range"
                    overrideDisableButton={RangeHelper.IsSystemRange(savedRange)}
                    ConfigEntity={savedRange}
                    DisplayMode="Glyph"
                    ConfirmAction={RangeRedux.RangeDelete(savedRange)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !savedRange ? "" : savedRange.Name + "'?"}
                    ConfirmationTitle={"Delete Range"} />
            </div>
        </span>

        return <PanelDashboard headerText="Export" glyphicon="export">
            {content}
        </PanelDashboard>
    }

    onSelectedRangeChanged(selected: IRange[]) {
        this.props.onSelectRange(selected.length > 0 ? selected[0].Uid : "");
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentRangeId: state.Range.CurrentRangeId,
        Ranges: state.Range.Ranges,
        Columns: state.Grid.Columns,
        RangeDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.ExportStrategyId)
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onExportRange: (rangeUid: string, exportDestination: ExportDestination) => dispatch(ExportRedux.Export(rangeUid, exportDestination)),
        onSelectRange: (rangeUid: string) => dispatch(RangeRedux.RangeSelect(rangeUid)),
        onNewRange: () => dispatch(PopupRedux.PopupShow("ExportAction", false, "New")),
        onEditRange: () => dispatch(PopupRedux.PopupShow("ExportAction", false, "Edit"))
    };
}

export let ExportToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ExportToolbarControlComponent);

