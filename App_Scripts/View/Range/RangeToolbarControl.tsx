import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Form, Dropdown, DropdownButton, Panel, FormControl, MenuItem, ControlLabel, Button, OverlayTrigger, Tooltip, FormGroup, Glyphicon, Label, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { IRange } from '../../Core/Interface/IRangeStrategy'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
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
import * as StrategyIds from '../../Core/StrategyIds'
import { RangeExportDestination } from '../../Core/Enums';


interface RangeToolbarControlComponentProps extends IStrategyViewPopupProps<RangeToolbarControlComponent> {
    onExportRange: (rangeUid: string, rangeExportDestination: RangeExportDestination) => RangeRedux.RangeExportAction;
    onSelectRange: (rangeUid: string) => RangeRedux.RangeSelectAction;
    onNewRange: () => PopupRedux.PopupShowAction;
    onEditRange: () => PopupRedux.PopupShowAction;
    Columns: IColumn[],
    Ranges: IRange[];
    CurrentRangeId: string;
    RangeDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean
}

class RangeToolbarControlComponent extends React.Component<RangeToolbarControlComponentProps, {}> {

    render(): any {
        let savedRange: IRange = this.props.Ranges.find(s => s.Uid == this.props.CurrentRangeId);

        let currentRangeId = StringExtensions.IsNullOrEmpty(this.props.CurrentRangeId) ?
            "select" : this.props.CurrentRangeId

        let availableRanges = this.props.Ranges.map((x, index) => {
            return <option value={x.Uid} key={index}>{x.Name}</option>
        })

        let csvMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.CSV)} key={"csv"}><Glyphicon glyph="export" /> {"CSV"}</MenuItem>
        let JSONMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.JSON)} key={"json"}><Glyphicon glyph="export" /> {"JSON"}</MenuItem>
        let clipboardMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.Clipboard)} key={"clipboard"}><Glyphicon glyph="export" /> {"Clipboard"}</MenuItem>
        let excelMenuItem: any = <MenuItem disabled={true} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.Excel)} key={"excel"}><Glyphicon glyph="export" /> {"Excel"}</MenuItem>
        let symphonyMenuItem: any = <MenuItem disabled={true} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.Symphony)} key={"symphony"}><Glyphicon glyph="export" /> {"Symphony"}</MenuItem>

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <Button bsStyle="primary">
                    {' '}<Glyphicon glyph="th" />{' '}Range
                </Button>
                {' '}
                <FormControl componentClass="select" placeholder="select"
                    value={currentRangeId}
                    onChange={(x) => this.onSelectedRangeChanged(x)} >
                    <option value="select" key="select">Select a Range</option>
                    {availableRanges}
                </FormControl>
                {' '}
                {currentRangeId != "select" &&
                    <DropdownButton bsStyle="default" title="Export To" id="exportDropdown" disabled={currentRangeId == "select"} >
                        {csvMenuItem}
                        {JSONMenuItem}
                        {clipboardMenuItem}
                        {excelMenuItem}
                        {symphonyMenuItem}
                    </DropdownButton>
                }
                {' '}
                <ButtonClear onClick={() => this.props.onSelectRange("")}
                    overrideTooltip="Clear Current Range"
                    overrideDisableButton={currentRangeId == "select"}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonEdit onClick={() => this.props.onEditRange()}
                    overrideTooltip="Edit Range"
                    overrideDisableButton={currentRangeId == "select"}
                    ConfigEntity={savedRange}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonNew onClick={() => this.props.onNewRange()}
                    overrideTooltip="Create New Range"
                    DisplayMode="Glyph" />
                {' '}
                <ButtonDelete
                    overrideTooltip="Delete Range"
                    overrideDisableButton={currentRangeId == "select"}
                    ConfigEntity={savedRange}
                    DisplayMode="Glyph"
                    ConfirmAction={RangeRedux.RangeDelete(savedRange)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !savedRange ? "" : savedRange.Name + "'?"}
                    ConfirmationTitle={"Delete Range"} />
            </div>
        </span>

        return <Panel className="small-padding-panel" >
            <AdaptableBlotterForm inline>
                {content}
            </AdaptableBlotterForm>
        </Panel>
    }

    private onSelectedRangeChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "select") {
            this.props.onSelectRange("");
        } else {
            this.props.onSelectRange(e.value);
        }
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentRangeId: state.Range.CurrentRangeId,
        Ranges: state.Range.Ranges,
        Columns: state.Grid.Columns,
        RangeDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.RangeStrategyId)
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onExportRange: (rangeUid: string, rangeExportDestination: RangeExportDestination) => dispatch(RangeRedux.RangeExport(rangeUid, rangeExportDestination)),
        onSelectRange: (rangeUid: string) => dispatch(RangeRedux.RangeSelect(rangeUid)),
        onNewRange: () => dispatch(PopupRedux.PopupShow("RangeConfig", false, "New")),
        onEditRange: () => dispatch(PopupRedux.PopupShow("RangeConfig", false, "Edit"))
    };
}

export let RangeToolbarControl = connect(mapStateToProps, mapDispatchToProps)(RangeToolbarControlComponent);

